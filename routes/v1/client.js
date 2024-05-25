var express = require("express");
var router = express.Router();
var auth = require("../../config/authconfig");
const { clientController } = require("../../controllers");

router.get("/getProperties", auth.verifyToken, clientController.getProperties);

router.post(
    "/likeProperty/:id",
    auth.verifyToken,
    clientController.likeProperty
);

router.post(
    "/unlikeProperty/:id",
    auth.verifyToken,
    clientController.unlikeProperty
);

router.post(
    "/:userId/imInterested/:id",
    auth.verifyToken,
    clientController.imInterested
);

router.get(
    "/getInterestedProperties/:userId",
    auth.verifyToken,
    clientController.getInterestedProperties
);

router.get(
    "/getOwnerDetails/:id",
    auth.verifyToken,
    clientController.getOwnerDetails
);





module.exports = router;
