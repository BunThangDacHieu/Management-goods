const User = require('../model/user');
const jwt = require('jsonwebtoken');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.isAdminAuhthentication = catchAsyncErrors(
    async(req, res, next) =>{
        
    }
)