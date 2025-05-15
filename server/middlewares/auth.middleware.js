const jwt = require("jsonwebtoken");


const authenticate = (req, res, next) => {
    
    const token = req.cookies.authToken;
    console.log(token);
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                res.status(401).send("invalid token!");
            } else {
                console.log(data);
                req.user = data;
                next();
            }
        });
    } else {
        res.status(401).send("User not authenticated!");
    }
};

module.exports = authenticate;
