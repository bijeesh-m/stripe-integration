const Cart = require("../models/cartModel");

// const Order = require("../models/order");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

console.log(process.env.STRIPE_SECRET_KEY);

// module.exports.createOrder = async (req, res) => {
//     const { orderBy, product, orderID } = req.body;

//     console.log(req.body);

//     try {
//         const order = await Order.create({
//             orderId: orderID,
//             orderBy: orderBy,
//             products: product,
//         });
//         res.status(201).json({ message: "Order created successfully!", order });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Failed" });
//     }
// };

// module.exports.getOrders = async (req, res) => {
//     try {
//         const orders = await Order.find().populate("orderBy")
//         res.status(201).json({ message: "Orders fetched successfully!", orders });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Failed" });
//     }
// };

// module.exports.getUserOrders = async (req, res) => {
//     const { userId } = req.params;
//     try {
//         const orders = await Order.find({ orderBy: userId });
//         res.status(201).json({ message: "Orders fetched successfully!", orders });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Failed" });
//     }
// };

// module.exports.findById = async (req, res) => {
//     const orderId = req.params.orderId;
//     try {
//         const order = await Order.findById(orderId);
//         res.status(200).json({ message: "Order fetched!", order });
//     } catch (error) {
//         console.log(error);
//         res.status(200).json({ message: "Failed!" });
//     }
// };

const cartItems = [
    {
        name: "Bluetooth Headphones",
        description: "Wireless over-ear headphones with noise cancellation",
        price: 2999, // ₹2,999
        quantity: 1,
        image: "https://images.pexels.com/photos/18319034/pexels-photo-18319034/free-photo-of-women-in-coats-at-cafe.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
        name: "Laptop Stand",
        description: "Ergonomic aluminum stand for laptops up to 15.6 inches",
        price: 1299, // ₹1,299
        quantity: 2,
        image: "https://images.pexels.com/photos/18319034/pexels-photo-18319034/free-photo-of-women-in-coats-at-cafe.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
        name: "USB-C Hub",
        description: "Multiport adapter with HDMI, USB 3.0, and SD card reader",
        price: 899, // ₹899
        quantity: 1,
        image: "https://example.com/images/usb-hub.jpg",
    },
];

module.exports.checkout = async (req, res) => {
    try {
        const userId = req.params.userId;

        const userCart = await Cart.findOne({ userId: "6815e26745f905fe81ea5bb0" }).populate("items.productId");

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
            submit_type: "pay", // "pay" is better for e-commerce than "donate"
            billing_address_collection: "required", // 🛠️ Ask address
            customer_creation: "always", // 🛠️ Create customer
            line_items: userCart.items.map((item) => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.productName, // Product Name (Ex: T-Shirt, Shoes)
                        description: item.productId.description, // Product Description (Ex: Cotton T-shirt, Size M)
                        images: [item.productId.images[0]], // Optional: Product Image URL
                    },
                    unit_amount: Math.round(item.productId.price * 100), // Price in paise (INR cents)
                },
                quantity: item.quantity, // How many quantities
            })),
            payment_intent_data: {
                description: "Purchase of products from MyStore.in", // VERY important for Indian export compliance
                metadata: {
                    customerId: userId, // Your own customer tracking ID (optional but good)
                    cartId: 1233, // Cart ID or Order ID (optional)
                },
            },
        });

        console.log(session.url);

        res.status(200).json({ success: true, message: "order successful!", url: session.url });
    } catch (error) {
        res.status(500).json({ message: "Failed", error: error.message });
    }
};
