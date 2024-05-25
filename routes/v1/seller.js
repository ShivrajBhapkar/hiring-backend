var express = require("express");
var router = express.Router();
const fileUpload = require("express-fileupload");
const auth = require("../../config/authconfig");
const { propertyController } = require("../../controllers");

// Middleware
router.use(express.json());
router.use(fileUpload());

router.post("/addProperty", auth.verifyToken, propertyController.addProperty);

//delete property
router.delete(
    "/deleteProperty/:id",
    auth.verifyToken,
    propertyController.deleteProperty
);

//update property
router.put(
    "/updateProperty/:id",
    auth.verifyToken,
    propertyController.updateProperty
);

router.get(
    "/getProperty/:id",
    auth.verifyToken,
    propertyController.getPropertyById
);
router.get(
    "/getProperties",
    auth.verifyToken,
    propertyController.getProperties
);



//route to fetch properties posted by user and interested user details
router.get(
    "/getInterestedUsers/:id",
    auth.verifyToken,
    propertyController.getInterestedUsers
);


module.exports = router;
