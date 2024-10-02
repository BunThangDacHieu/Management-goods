const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Category = require('../model/category');


//-------------<Các method chuyền đến server đối với Category>---------------/
exports.GetAllCategory = catchAsyncErrors(async (req, res) => {
    try {
        const categorys = await Category.find();
        res.status(200).json(categorys);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}
)
//tạo danh mục sản phẩm
exports.CreateCategory = catchAsyncErrors(async (req, res) => {
    const { name, description } = req.body;
    try {
        const newCategory = new Category({
            name,
            description
        });

        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});