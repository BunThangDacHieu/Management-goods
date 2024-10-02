const Supplier = require('../model/supplier');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');


//-------------<Các method chuyền đến server đối với Supplier>---------------/
exports.GetAllSupplier = catchAsyncErrors(async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
//tạo nhà cung cấp
exports.CreateSupplier = catchAsyncErrors(async (req, res) => {
    const { name, address, contactEmail, contactPhone } = req.body;
    //Kt xem nhà cung cấp là bắt buộc hay không
    if (!name || !contactEmail) {
        return res.status(400).json({ message: 'Tên và Email là bắt buộc' });
    }
    //tạo nhà cung cấp mới
    try {
        const newSupplier = new Supplier({
            name,
            address,
            contactEmail,
            contactPhone
        });
    
        const savedSupplier = await newSupplier.save();
        res.status(201).json(savedSupplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
