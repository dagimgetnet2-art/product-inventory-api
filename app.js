const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to Product Inventory REST API",
        version: "1.0.0"
    });
});

app.use('/products', productRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Resource not found"
    });
});

app.use((err, req, res, next) => {
    res.status(500).json({
        message: "Internal server error"
    });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
