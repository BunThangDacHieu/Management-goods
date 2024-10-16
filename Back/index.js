require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const ConnectDB = require('./config/db'); 
const routerController = require('./router/webRouter'); 
const cors = require('cors');
const { errorMiddleware } = require('./middleware/error');

//database
ConnectDB({
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const port = process.env.PORT || 9999;

app.set('view engine', 'ejs');

app.use(cors());

app.use(
    cors({
        origin: 'http://localhost:3000'
    })
)

// Middleware
app.use(express.json()); 
app.use(morgan('dev'));
app.use(helmet());     

// Các Luồng dữ liệu
app.use('/', routerController);

//Cái con mẹ gì đây :v
app.use((err, req, res, next) => {
    //in ra lỗi bằng log
    console.error(err);
    //kiểm tra statusCode ở đối tượng err, nếu có thì sd còn nếu ko thì mặc định là 500
    const statusCode = err.statusCode || 500;
    //Và trả về văn bản? dưới dạng json gì gì đó
    res.status(statusCode).json({
        //gửi err mess/hoặc một cái tin nhắn gì đó  
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
