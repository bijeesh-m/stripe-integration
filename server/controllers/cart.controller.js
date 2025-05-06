const Cart = require("../models/cartModel");
const productModel = require("../models/productModel");

module.exports.getUserCart = async (req, res) => {
    try {
        const userCart = await Cart.findOne({ userId: "6815e26745f905fe81ea5bb0" }).populate("items.productId");

        res.status(200).json({ message: "User cart fetched success", userCart });
    } catch (error) {
        res.status(500).json({ message: "Error while fetching user cart", error: error.message });
    }
};
module.exports.addToCart = async (req, res) => {

    console.log("from add to cart...");
    try {
        const userCart = await Cart.findOne({ userId: "6815e26745f905fe81ea5bb0" });

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

            const isExist = userCart.items.find((ele) => ele.productId.toString() === product._id.toString());

            if (isExist) {
                const updatedItems = userCart.items.map((ele) => {
                    if (ele.productId.toString() == product._id.toString()) {
                        ele.quantity += 1;
                    }
                    return ele;
                });

                console.log("user cart from update quantity :",userCart);
            } else {
                const productData = { productId: product._id, productName: product.title, price: product.price };
                userCart.items.push(productData);
            }
        }

        const totalAmount = userCart.items.reduce((acc, ele) => acc + ele.price * ele.quantity, 0);

        userCart.totalAmount = Math.round(totalAmount);

        await userCart.save();

        res.status(200).json({ message: "Item added to cart", userCart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while fetching user cart", error: error.message });
    }
};

module.exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.params;

    console.log("from updating cart!");

    try {
        const cart = await Cart.findOne({ userId: "6815e26745f905fe81ea5bb0" });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Filter out the item
        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

        // Recalculate totalAmount
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        await cart.save();

        const updatedCart = await cart.populate("items.productId");
        res.status(200).json(updatedCart);
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
