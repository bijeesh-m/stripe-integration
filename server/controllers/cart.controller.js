const Cart = require("../models/cartModel");
const productModel = require("../models/productModel");

module.exports.getUserCart = async (req, res) => {
    try {
        const userCart = await Cart.find({ userId: "6815e26745f905fe81ea5bb0" });

        res.status(200).json({ message: "User cart fetched success", userCart });
    } catch (error) {
        res.status(500).json({ message: "Error while fetching user cart", error: error.message });
    }
};
module.exports.addToCart = async (req, res) => {
    try {
        const userCart = await Cart.findOne({ userId: "6815e26745f905fe81ea5bb0" });
        // console.log(userCart);

        if (!userCart) {
            const product = await productModel.findById(req.body.productId);
            const cart = {
                userId: "6815e26745f905fe81ea5bb0",
                items: [{ productId: product._id, productName: product.title, price: product.price }],
                totalAmount: product.price,
            };

            await Cart.create(cart);

            return res.status(200).json({ message: "Item added to cart", userCart });
        } else {
            const product = await productModel.findById(req.body.productId);

            // console.log("Product :", product);

            const isExist = userCart.items.find((ele) => ele.productId == req.body.productId);

            console.log("IsExist :", isExist);

            if (isExist) {
                const updatedItems = userCart.items.map((ele) => {
                    if (ele.productId == product._id) {
                        console.log("item matched!");
                        ele.quantity += 1;
                    }
                });

                console.log("updatedItems", updatedItems);

                // userCart.items = updatedItems;
            } else {
                const productData = { productId: product._id, productName: product.title, price: product.price };
                userCart.items.push(productData);
            }
        }

        console.log(userCart);

        const totalAmount = userCart.items.reduce((acc, ele) => acc + ele.price * ele.quantity, 0);

        userCart.totalAmount = totalAmount;

        await userCart.save();

        res.status(200).json({ message: "Item added to cart", userCart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while fetching user cart", error: error.message });
    }
};
