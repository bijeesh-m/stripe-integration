const mongoose = require("mongoose");

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("DB connected!");
        })
        .catch((err) => {
            console.log("Error occured when connecting to database :", err.message);
        });
};

module.exports = connectDB;
