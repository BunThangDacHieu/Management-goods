const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
//tại sao lại phiền thế nayf11!!!! WHyyyy
const Category = require('../model/category'); //Kiểm tra doanh mục
const Supplier = require('../model/supplier');// kiểm tra nhà cung cấp
const Warehouse = require('../model/warehouse'); // Kiểm tra Kho



//-------------<Các method chuyền đến server đối với Products>---------------/
//Hiển thị toàn bộ cơ sở dữ liệu trong hệ thống
exports.GetAllProducts = catchAsyncErrors(async (req, res, next) => {
    try {
        //Khai báo một hàm products rỗng rồi sử dụng lệnh find() trong 
        //express để get cơ sở dữ liệu từ Model Product từ Mongo
        const products = await Product.find();
        //Trả lại giá trị cơ sở dữ liệu và trả lại với status 200 xác nhận 
        //rằng lệnh đã thực thi chính xác
        res.status(200).json(products);
    } catch (error) {
        //Trả lại tin nhắn lỗi khi có vấn đề, đồng thời hiện vấn đề lỗi
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})
//Nhận thông tin dữ liệu từ một Product cụ thể
exports.getProductbyId = catchAsyncErrors(async (req, res) => {
    try {
        //Trả lại giá trị cơ sở dữ liệu và trả không xác nhận bằng lệnh không thực thi chính xác
        const product = await Product.findById(req.params.id).populate('category');
        //Nếu sản phẩm/product không có hoặc không tồn tại, trả về giá trị bên dưới
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Nhập thông tin dữ liệu Product
exports.CreateProduct = catchAsyncErrors(async (req, res, next) =>{
    try {
        //Nhập dữ liệu các giá trị?? Cái này phải khai báo ko nhỉ :V
        const {name, price, category, quantity, supplier, warehouse, description, sku} = req.body;
        //Kiểm tra các trường yêu cầu required -> bắt buộc phải có/yêu cầu bắt buộc
        if(!name || !price ||!category){
            return res.status(400).json({message: 'Tên sản phẩm, giá cả và danh mục là bắt buộc'})
        }
        //ưewtgeqyw
        //Kiểm tra sản phẩm phải tồn tại trong danh mục có sẵn không?
        const ExistCategory = await Category.findById(category);
        if (!ExistCategory) {
            return res.status(404).json({ message: 'Danh mục không tồn tại.' });
        }

        //Kiểm tra nhà cung cấp sẵn phát phải tồn tại trong danh mục có sẵn không?
        const ExistSupplier = await Supplier.findById(supplier);
        if(!ExistSupplier){
            return res.status(404).json({message: 'Supplier not found'});
        }
        //Kiểm tra Kho sẵn phát phải tồn tại trong danh mục có sẵn không?
        const ExistWarehouse = await Warehouse.findById(warehouse);
        if(!ExistWarehouse){
            return res.status(404).json({message: 'Warehouse not found'});
        }
        //Tạo sản phẩm mới
        const newProduct = new Product({
            name,
            price,
            category,
            quantity: quantity || 0, // Sử dụng giá trị mặc định nếu không cung cấp
            supplier: supplier, 
            warehouse: warehouse ,
            description: description || '',
            sku: sku 
        });

        // Lưu sản phẩm vào cơ sở dữ liệu
        const savedProduct = await newProduct.save();
        res.status(201).json({
            message: 'Sản phẩm được tạo success'
        });
        res.status(200).json(savedProduct);
    } catch (error) {
        next(error);
    }
})



