const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Category = require('../model/category'); // Kiểm tra danh mục
const Supplier = require('../model/supplier'); // Kiểm tra nhà cung cấp
const Warehouse = require('../model/warehouse'); // Kiểm tra kho

// Hiển thị toàn bộ cơ sở dữ liệu trong hệ thống
exports.GetAllProducts = catchAsyncErrors(async (req, res, next) => {
    
        const products = await Product.find().populate('supplier')  
        .populate('warehouse')  
        .exec();
        return res.status(200).json(products); // Đảm bảo bạn chỉ gọi res.json() một lần

});

// Nhận thông tin dữ liệu từ một Product cụ thể
exports.getProductbyId = catchAsyncErrors(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Nhập thông tin dữ liệu Product
exports.CreateProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        const { name, price, category, quantity, supplier, warehouse, description, sku } = req.body;

        // Kiểm tra các trường yêu cầu
        if (!name || !price || !category || !supplier || !warehouse) {
            return res.status(400).json({ message: 'Tên sản phẩm, giá cả, danh mục, nhà cung cấp và kho là bắt buộc' });
        }

        // Kiểm tra xem danh mục có tồn tại không
        const ExistCategory = await Category.findOne({ name: category });
        if (!ExistCategory) {
            return res.status(404).json({ message: 'Danh mục không tồn tại.' });
        }

        // Kiểm tra nhà cung cấp
        const ExistSupplier = await Supplier.findOne({ name: supplier });
        if (!ExistSupplier) {
            return res.status(404).json({ message: 'Nhà cung cấp không tồn tại.' });
        }

        // Kiểm tra kho
        const ExistWarehouse = await Warehouse.findOne({ name: warehouse });
        if (!ExistWarehouse) {
            return res.status(404).json({ message: 'Kho hàng không tồn tại.' });
        }

        // Tạo sản phẩm mới
        const newProduct = new Product({
            name,
            price: parseFloat(price), // Chuyển đổi price thành số
            category: ExistCategory._id, // Lưu _id của danh mục
            quantity: quantity || 0, // Giá trị mặc định nếu không cung cấp
            supplier: ExistSupplier._id, // Lưu _id của nhà cung cấp
            warehouse: ExistWarehouse._id, // Lưu _id của kho
            description: description || '',
            sku: sku
        });

        // Lưu sản phẩm vào cơ sở dữ liệu
        const savedProduct = await newProduct.save();
        return res.status(201).json(savedProduct);
    } catch (error) {
        next(error);
    }
});


// Cập nhật thông tin cơ sở dữ liệu bằng ID
exports.UpdateProduct = catchAsyncErrors(async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, // Id của Product
            req.body, // dữ liệu của đối tượng Product
            {
                new: true, // trả về dữ liệu được cập nhật
                runValidators: true, // áp dụng các validator
            }
        ).populate('category');

        // Kiểm tra dữ liệu có vấn đề gì không
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



//Xóa cơ sở dữ liệu Product bằng Id
exports.DeleteProduct = catchAsyncErrors(async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});