require('dotenv').config();
const express = require('express');
const ConnectDB = require('./config/db');
ConnectDB();

const app = express();
const port = process.env.PORT || 9999;

app.use(express.json());
// Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => console.log(`Listen on the ${port}`))