require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const ConnectDB = require('./config/db'); 
const router = require('./router/webRouter'); 

// Connect to the database
ConnectDB({
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const port = process.env.PORT || 9999;

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev'));
app.use(express.json()); // Parses incoming JSON requests

// Define routes
app.use('/', router);

// Handle 404 for any undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Page not found' });
});

// Start the server
app.listen(port, () => console.log(`Listening on port ${port}`));
