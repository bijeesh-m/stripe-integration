const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../models/user.model");

module.exports.register = async (req, res) => {
    try {
        const isExist = await Users.findOne({ email: req.body.email });
        if (isExist) {
            return res.status(409).json({ message: "User already exist!", status: "failed" });
        }
        const user = await Users.create(req.body);
        res.status(201).json({ message: "Register success", user });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports.login = async (req, res) => {
    try {
        const isExist = await Users.findOne({ email: req.body.email });
        if (isExist) {
            if (req.body.password === isExist.password) {
                const token = jwt.sign({ name: isExist.name, role: isExist._id }, process.env.JWT_SECRET, {
                    expiresIn: "1hr",
                });
                res.cookie("authToken", token, { expiresIn: "1hr" });
                res.status(200).json({ message: "Login success!", isExist });
            } else {
                res.status(400).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(404).send("User not found!");
        }
    } catch (error) {
        console.log(error.message);
    }
};
