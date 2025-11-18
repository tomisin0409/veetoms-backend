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
