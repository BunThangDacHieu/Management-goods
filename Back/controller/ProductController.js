const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Category = require('../model/category'); // Kiểm tra danh mục
const Supplier = require('../model/supplier'); // Kiểm tra nhà cung cấp
const Warehouse = require('../model/warehouse'); // Kiểm tra kho

// Hiển thị toàn bộ cơ sở dữ liệu trong hệ thống
exports.GetAllProducts = catchAsyncErrors(async (req, res, next) => {
        const products = await Product.find()
        .populate('supplier')  
        .populate('warehouse')
        .populate('category')
        .exec();
        return res.status(200).json(products); 

});

// Nhận thông tin dữ liệu từ một Product cụ thể
exports.getProductbyId = catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
});

// Nhập thông tin dữ liệu Product
exports.CreateProduct = catchAsyncErrors(async (req, res, next) => {
    const { name, price, category, quantity, supplier, warehouse, description, sku, barcode } = req.body;

    // Kiểm tra các trường yêu cầu
    if (!name || !price || !category || !supplier || !warehouse) {
        return res.status(400).json({ message: 'Tên sản phẩm, giá cả, danh mục, nhà cung cấp và kho là bắt buộc' });
    }

    // Kiểm tra xem danh mục có tồn tại không
    const ExistCategory = await Category.findById(category); 
    if (!ExistCategory) {
        return res.status(404).json({ message: 'Danh mục không tồn tại.' });
    }

    // Kiểm tra nhà cung cấp
    const ExistSupplier = await Supplier.findById(supplier); 
    if (!ExistSupplier) {
        return res.status(404).json({ message: 'Nhà cung cấp không tồn tại.' });
    }

    // Kiểm tra kho
    const ExistWarehouse = await Warehouse.findById(warehouse); 
    if (!ExistWarehouse) {
        return res.status(404).json({ message: 'Kho hàng không tồn tại.' });
    }

    // Tạo sản phẩm mới
    const newProduct = new Product({
        name,
        price: parseFloat(price),
        category: ExistCategory._id,
        quantity: quantity || 0,
        supplier: ExistSupplier._id,
        warehouse: ExistWarehouse._id,
        description: description || '',
        sku,
        barcode 
    });

    // Lưu sản phẩm vào cơ sở dữ liệu
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
});


// Cập nhật thông tin cơ sở dữ liệu bằng ID
exports.UpdateProduct = catchAsyncErrors(async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    ).populate('category');

    if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
});



//Xóa cơ sở dữ liệu Product bằng Id
exports.DeleteProduct = catchAsyncErrors(async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
});