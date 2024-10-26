require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const ConnectDB = require('./config/db'); 
const routerController = require('./router/webRouter'); 
const cors = require('cors');
const { errorMiddleware } = require('./middleware/error');
const cookieParser = require('cookie-parser');

//database
ConnectDB({
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const port = process.env.PORT || 9999;

app.set('view engine', 'ejs');
app.use(cors({
    origin: 'http://localhost:3000', // Địa chỉ frontend
    credentials: true, // Cho phép gửi cookie cùng request
  }));

// Middleware
app.use(express.json()); 
app.use(morgan('dev'));
app.use(helmet());     
app.use(cookieParser());
// Các Luồng dữ liệu
app.use('/', routerController);

//Cái con mẹ gì đây :v
app.use((err, req, res, next) => {
    // In ra lỗi bằng log
    console.error(err);
    // Kiểm tra xem đã gửi phản hồi chưa
    if (res.headersSent) {
        return next(err); // Nếu đã gửi phản hồi, chỉ cần gọi next để không gửi lại phản hồi
    }
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
    });
});

// 404
app.use((req, res) => {
    res.status(404).json({ message: 'Page not found' });
});
app.use(errorMiddleware);
//server
app.listen(port, () => console.log(`Listening on port ${port}`));
