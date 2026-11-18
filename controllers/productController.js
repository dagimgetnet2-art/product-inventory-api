let products = require('../data/products');

const validateProduct = (body) => {
    if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
        return false;
    }

    const { name, price, quantity, category } = body;

    if (name === undefined || name === null || typeof name !== 'string' || name.trim() === '') {
        return false;
    }

    if (price === undefined || price === null || typeof price !== 'number' || isNaN(price) || price <= 0) {
        return false;
    }

    if (quantity === undefined || quantity === null || typeof quantity !== 'number' || isNaN(quantity) || quantity < 0) {
        return false;
    }

    if (category === undefined || category === null || typeof category !== 'string' || category.trim() === '') {
        return false;
    }

    return true;
};

const getAllProducts = (req, res) => {
    res.status(200).json(products);
};

const getProductById = (req, res) => {
    const productId = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
        return res.status(404).json({ message: "Product not found" });
    }

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
};

const createProduct = (req, res) => {
    if (!validateProduct(req.body)) {
        return res.status(400).json({ message: "Validation failed" });
    }

    const { name, price, quantity, category } = req.body;

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = {
        id: newId,
        name: name.trim(),
        price: Number(price),
        quantity: Number(quantity),
        category: category.trim()
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
    const productId = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
        return res.status(404).json({ message: "Product not found" });
    }

    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    if (!validateProduct(req.body)) {
        return res.status(400).json({ message: "Validation failed" });
    }

    const { name, price, quantity, category } = req.body;

    products[productIndex] = {
        id: productId,
        name: name.trim(),
        price: Number(price),
        quantity: Number(quantity),
        category: category.trim()
    };

    res.status(200).json(products[productIndex]);
};

const deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
        return res.status(404).json({ message: "Product not found" });
    }

    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    products.splice(productIndex, 1);

    res.status(200).json({ message: "Product deleted successfully" });
};

const searchProducts = (req, res) => {
    const { name } = req.query;

    if (!name || typeof name !== 'string') {
        return res.status(200).json([]);
    }

    const searchTerm = name.trim().toLowerCase();
    const matchingProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm));

    res.status(200).json(matchingProducts);
};

const getProductsByCategory = (req, res) => {
    const { category } = req.params;

    if (!category) {
        return res.status(400).json({ message: "Validation failed" });
    }

    const categoryTerm = category.trim().toLowerCase();
    const filteredProducts = products.filter(p => p.category.toLowerCase() === categoryTerm);

    res.status(200).json(filteredProducts);
};

const getProductsUnderPrice = (req, res) => {
    const maxPrice = parseFloat(req.params.price);

    if (isNaN(maxPrice) || maxPrice <= 0) {
        return res.status(400).json({ message: "Validation failed" });
    }

    const filteredProducts = products.filter(p => p.price < maxPrice);

    res.status(200).json(filteredProducts);
};

const getLowStockProducts = (req, res) => {
    const lowStockProducts = products.filter(p => p.quantity < 5);

    res.status(200).json(lowStockProducts);
};

const getTotalInventoryValue = (req, res) => {
    const totalInventoryValue = products.reduce((total, p) => total + (p.price * p.quantity), 0);

    res.status(200).json({ totalInventoryValue });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategory,
    getProductsUnderPrice,
    getLowStockProducts,
    getTotalInventoryValue
};
