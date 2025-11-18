import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ALWAYS correct path to products.json
const productsFile = path.join(__dirname, "products.json");

const app = express();
app.use(cors());
app.use(express.json());

// Load products
function loadProducts() {
    if (!fs.existsSync(productsFile)) {
        fs.writeFileSync(productsFile, "[]", "utf8");
    }
    return JSON.parse(fs.readFileSync(productsFile, "utf8"));
}

// Save products
function saveProducts(products) {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
}

// Example GET route
app.get("/products", (req, res) => {
    const products = loadProducts();
    res.json(products);
});

// Example POST route
app.post("/products", (req, res) => {
    const products = loadProducts();
    products.push(req.body);
    saveProducts(products);
    res.json({ message: "Product added", product: req.body });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
