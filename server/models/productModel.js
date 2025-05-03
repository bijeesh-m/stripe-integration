const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    comment: String,
    date: { type: Date, default: Date.now },
    reviewerName: String,
    reviewerEmail: String,
});

const dimensionSchema = new mongoose.Schema({
    width: Number,
    height: Number,
    depth: Number,
});

const metaSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    barcode: String,
    qrCode: String,
});

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: String,
    price: { type: Number, required: true },
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    tags: [String],
    sku: String,
    weight: Number,
    dimensions: dimensionSchema,
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    reviews: [reviewSchema],
    returnPolicy: String,
    minimumOrderQuantity: Number,
    meta: metaSchema,
    images: [String],
    thumbnail: String,
});

module.exports = mongoose.model("Product", productSchema);
