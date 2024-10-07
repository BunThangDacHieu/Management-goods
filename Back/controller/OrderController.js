const Order = require('../model/order');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');



//-------------<Các method chuyền đến server đối với Order>---------------/
exports.GetAllOrder= catchAsyncErrors((req, res, next) =>{
    try {
        const orders = Order.find().populate('username', 'name', 'email')
        // .populate('username', 'name', 'email').
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

//Taoj ddonw hàng mới
exports.CreateOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const { user, products, shippingAddress } = req.body;

        if (!user || !products || !shippingAddress) {
            return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin đơn hàng.' });
        }

        // Toong tieenf
        const totalPrice = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const newOrder = await Order.create({
            user,
            products,
            totalPrice,
            shippingAddress
        });

        res.status(201).json({
            success: true,
            data: newOrder
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

//Thông tin đơn hàng dựa theo Id
exports.GetOrderById = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID đơn hàng không hợp lệ.' });
        }

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});


//Cập nhật đơn hàng
exports.UpdateOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID đơn hàng không hợp lệ.' });
        }

        const updateData = req.body;

        // If updating status, ensure it's one of the allowed enum values
        if (updateData.status && !['đang chờ', 'Đang xử lý', 'Đang giao', 'Đã giao', 'Hủy bỏ'].includes(updateData.status)) {
            return res.status(400).json({ message: 'Trạng thái đơn hàng không hợp lệ.' });
        }
        const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng để cập nhật.' });
        }

        res.status(200).json({
            success: true,
            data: updatedOrder
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

//Xóa đơn hàng
exports.DeleteOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID đơn hàng không hợp lệ.' });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng để xóa.' });
        }

        await order.remove();

        res.status(200).json({
            success: true,
            message: 'Đơn hàng đã được xóa thành công.'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});