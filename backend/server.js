const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Set EJS as the template engine

// Use routes
app.use('/', require('./src/routes/index'));
app.use('/users', require('./src/routes/users'));
app.use('/products', require('./src/routes/products'));
app.use('/categories', require('./src/routes/categories'));
app.use('/carts', require('./src/routes/carts'));
app.use('/cartItems', require('./src/routes/cartItems'));

// Start server
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
