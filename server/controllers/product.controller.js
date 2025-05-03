const Product = require("../models/productModel");

module.exports.getAllProducts = async (req, res) => {
    try {
        console.log("from products route!");
        const products = await Product.find();
        res.status(200).json({ message: "success", products });
    } catch (error) {
        res.status(500).json({ message: "Error while fetching products", error: error.message });
    }
};
