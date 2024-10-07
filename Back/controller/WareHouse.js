const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const WareHouse = require('../model/warehouse');


//-------------<Các method chuyền đến server đối với WareHouse>---------------/
exports.GetAllWareHouse = catchAsyncErrors(async(req, res)=>{
    try {
        const warehouses = await WareHouse.find();
        res.status(200).json(warehouses);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

//Tạo nhà kho
exports.CreateWareHouse = catchAsyncErrors(async(req, res) => {
    const { name, location, capacity} = req.body;
    //Kt kho bãi là bắt buộc hay không
    if (!name) {
        return res.status(400).json({ message: 'Tên là bắt buộc' });
    }
    //tạo nhà kho mới
    try {
        const newWareHouse = new WareHouse({
            name,
            location,
            capacity
        });
        const savedWareHouse = await newWareHouse.save();
        res.status(200).json(savedWareHouse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Tìm nhà kho dựa trên ID
exports.getWareHousebyId = catchAsyncErrors(async(req, res) =>{
    try {
        const wareHouse = await WareHouse.findById(req.params.id);
        if (!wareHouse) {
            return res.status(404).json({ message: 'Nhà Kho không tồn tại' });
        }
        res.status(200).json(wareHouse);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
//Cập nhật thông tin của nhà kho
exports.UpdateWareHouse = catchAsyncErrors(async(req, res) =>{
    try{
        const updateWareHouse = await WareHouse.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updateWareHouse) {
            return res.status(404).json({ message: 'Nhà Kho không tồn tại' });
        }
        res.status(200).json(updateWareHouse);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
})

//Xóa nhà kho
exports.DeleteWareHouse = catchAsyncErrors(async(req, res) =>{
    try {
        const deleteWareHouse = await WareHouse.findByIdAndDelete(req.params.id);
        if (!deleteWareHouse) {
            return res.status(404).json({ message: 'Nhà Kho không tồn tại' });
        }
        res.status(200).json({ message: 'Nhà Kho đã được xoá' });
    } catch(error){
        res.status(500).json({ message: error.message });
    }
})