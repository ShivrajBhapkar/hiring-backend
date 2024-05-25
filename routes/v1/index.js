var express = require("express");
var router = express.Router();
var AuthRoutes = require("./auth");
var propertyRoutes = require("./seller");
var clientRoutes = require("./client");
var auth = require("../../config/authconfig");

router.use("/", AuthRoutes);
router.use("/seller", propertyRoutes);
router.use("/buyer", clientRoutes);

router.get("/verify", auth.verifyToken, (req, res) => {
    res.status(200).json({ message: "Token verified", role: req.user_role });
});

module.exports = router;
