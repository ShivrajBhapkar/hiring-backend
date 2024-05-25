const { clientService } = require("../services");

const getProperties = async (req, res) => {
    try {
        const properties = await clientService.getPropertiesService();
        res.status(200).json({
            message: "Properties fetched successfully",
            data: properties,
        });
    } catch (error) {
        console.error("Error occurred while fetching properties:", error);
        res.status(500).json({
            message: "Error occurred while fetching properties",
            error: error.message,
        });
    }
};

const likeProperty = async (req, res) => {
    try {
        const property = await clientService.likePropertyService(
            req.params.id,
            req.user
        );
        res.status(200).json({
            message: "Property liked successfully",
            data: property,
        });
    } catch (error) {
        console.error("Error occurred while liking property:", error);
        res.status(500).json({
            message: "Error occurred while liking property",
            error: error.message,
        });
    }
};

const unlikeProperty = async (req, res) => {
    try {
        const property = await clientService.unlikePropertyService(
            req.params.id,
            req.user
        );
        res.status(200).json({
            message: "Property unliked successfully",
            data: property,
        });
    } catch (error) {
        console.error("Error occurred while unliking property:", error);
        res.status(500).json({
            message: "Error occurred while unliking property",
            error: error.message,
        });
    }
};

const imInterested = async (req, res) => {
    try {
        
        const property = await clientService.imInterestedService(
            req.params.userId,
            req.params.id,
            req.user
        );
        res.status(200).json({
            message: "Interested successfully",
            data: property,
        });
    } catch (error) {
        console.error("Error occurred while showing interest:", error);
        res.status(500).json({
            message: "Error occurred while showing interest",
            error: error.message,
        });
    }
};

const getInterestedProperties = async (req, res) => {
    try {
        
        const properties = await clientService.getInterestedPropertiesService(
            req.user,
            req.params.userId
        );
        res.status(200).json({
            message: "Properties fetched successfully",
            data: properties,
        });
    } catch (error) {
        console.error("Error occurred while fetching properties:", error);
        res.status(500).json({
            message: "Error occurred while fetching properties",
            error: error.message,
        });
    }
};



const getOwnerDetails = async (req, res) => {
    try {
        const owner = await clientService.getOwnerDetailsService(req.params.id);
        res.status(200).json({
            message: "Owner details fetched successfully",
            data: owner,
        });
    } catch (error) {
        console.error("Error occurred while fetching owner details:", error);
        res.status(500).json({
            message: "Error occurred while fetching owner details",
            error: error.message,
        });
    }
};



module.exports = {
    getProperties,
    likeProperty,
    unlikeProperty,
    imInterested,
    getInterestedProperties,
    getOwnerDetails,
};
