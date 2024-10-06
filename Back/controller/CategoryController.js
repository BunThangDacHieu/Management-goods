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

exports.getCategorybyId = catchAsyncErrors(async (req, res) => {
    try {
        const categories = await Category.findById(req.params.id);
        if (!categories) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
//Cập nhật danh mục bằng ID
exports.UpdateCategory = catchAsyncErrors(async (req, res) =>{
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });   
    }
})
//Xóa danh mục bằng Id
exports.DeleteCategory = catchAsyncErrors(async(req, res)=>{
    try {

        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});        
    }
})