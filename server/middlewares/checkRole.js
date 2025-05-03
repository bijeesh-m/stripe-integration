const checkRole = (roles) => {
    return (req, res, next) => {
        console.log(req.role);
        if (roles.includes(req.role)) {
            next();
        } else {
            res.status(401).send("Unauthorized!");
        }
    };
};

module.exports = checkRole;
