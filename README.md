# Product Inventory REST API

A RESTful Product Inventory API built with Node.js and Express.js using an in-memory JavaScript array.

## Project Structure

```
product-inventory-api/
│── node_modules/
│── package.json
│── app.js
│
├── routes/
│     └── productRoutes.js
│
├── controllers/
│     └── productController.js
│
├── data/
│     └── products.js
│
├── postman_collection.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

```bash
cd product-inventory-api
npm install
```

### Running the Server

```bash
npm start
```

For development mode with hot-reloading:

```bash
npm run dev
```

Server runs on: `http://localhost:3000`

---

## API Endpoints

### 1. Standard CRUD Operations

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | Get all products | 200 OK |
| `GET` | `/products/:id` | Get single product by ID | 200 OK / 404 Not Found |
| `POST` | `/products` | Create a new product | 201 Created / 400 Bad Request |
| `PUT` | `/products/:id` | Replace all fields of a product | 200 OK / 400 Bad Request / 404 Not Found |
| `DELETE` | `/products/:id` | Delete a product by ID | 200 OK / 404 Not Found |

### 2. Bonus Endpoints

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/products/search?name=laptop` | Search products by name (case-insensitive substring) | 200 OK |
| `GET` | `/products/category/:category` | Filter products by category | 200 OK |
| `GET` | `/products/price/:price` | Get products cheaper than specified price | 200 OK / 400 Bad Request |
| `GET` | `/products/low-stock` | Get products with quantity < 5 | 200 OK |
| `GET` | `/products/value` | Calculate total inventory value (`price * quantity`) | 200 OK |

---

## Request & Response Examples

### Add Product (`POST /products`)

**Request Body:**
```json
{
  "name": "Keyboard",
  "price": 45,
  "quantity": 15,
  "category": "Accessories"
}
```

**Response (201 Created):**
```json
{
  "id": 4,
  "name": "Keyboard",
  "price": 45,
  "quantity": 15,
  "category": "Accessories"
}
```

### Update Product (`PUT /products/2`)

**Request Body:**
```json
{
  "name": "Samsung Phone",
  "price": 650,
  "quantity": 10,
  "category": "Electronics"
}
```

**Response (200 OK):**
```json
{
  "id": 2,
  "name": "Samsung Phone",
  "price": 650,
  "quantity": 10,
  "category": "Electronics"
}
```

### Total Inventory Value (`GET /products/value`)

**Response (200 OK):**
```json
{
  "totalInventoryValue": 11200
}
```

### Validation Error Response (400 Bad Request)

```json
{
  "message": "Validation failed"
}
```

### Not Found Error Response (404 Not Found)

```json
{
  "message": "Product not found"
}
```

---

