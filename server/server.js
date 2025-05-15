const express = require("express");
const authRoute = require("./routes/auth.route");
const bookRoute = require("./routes/book.route");
const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();
require("dotenv").config();

app.use(express.json()); // for parsing req.body(data from client)

app.use(express.static('/uploads'))

connectDB();

app.use(cookieParser()); // for parsing cookies on server
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // credentials : true for accept cookies

app.use("/auth", authRoute); // authentication routes( login and register)
app.use("/books", bookRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

app.listen(4000, () => {
    console.log("server is running on port 4000!");
});
