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

//tìm kiếm Upplier bằng Id
exports.getSupplierbyId = catchAsyncErrors(async(req, res)=>{
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.status(200).json(supplier);
    } catch(error){
        res.status(500).json({message: error.message})
    }
})
//cập nhật thoogn tin supplier

exports.UpdateSupplierInformation = catchAsyncErrors(async(req, res) =>{
    try{
        const updateSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updateSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.status(200).json(updateSupplier);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
})
//Xóa supplier 
exports.DeleteSupplierbyId = catchAsyncErrors(async(req, res) =>{
    try {
        const deleteSupplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!deleteSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.status(200).json({ message: 'Supplier deleted successfully' });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
})