require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const ConnectDB = require('./config/db');
ConnectDB({
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const port = process.env.PORT || 9999;
app.set('view engine', 'ejs');
app.use(express.json());
// Handle 404

app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
  });
app.get('*', (req, res) => {
    res.status(404).json({ message: 'Page not found' });
});

app.listen(port,  () => console.log(`Listen on the ${port}`))