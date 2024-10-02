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
