const { propertyService } = require("../services");

const addProperty = async (req, res) => {
    if (req.user_role !== "Seller") {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    try {
        const propertyData = req.body;
        const newProperty = await propertyService.addProperty(
            propertyData,
            req.user
        );
        res.status(200).json({
            message: "Property added successfully",
            data: newProperty,
        });
    } catch (error) {
        console.error("Error occurred while adding property:", error);
        res.status(500).json({
            message: "Error occurred while adding property",
            error: error.message,
        });
    }
};

const updateProperty = async (req, res) => {
    if (req.user_role !== "Seller") {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    try {
        const propertyId = req.params.id;
        const propertyData = req.body;

        const updatedProperty = await propertyService.updateProperty(
            propertyId,
            propertyData,
            req.user
        );

        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.status(200).json({
            message: "Property updated successfully",
            data: updatedProperty,
        });
    } catch (error) {
        console.error("Error occurred while updating property:", error);
        res.status(500).json({
            message: "Error occurred while updating property",
            error: error.message,
        });
    }
};

const deleteProperty = async (req, res) => {
    if (req.user_role !== "Seller") {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    try {
        const propertyId = req.params.id;
        const deletedProperty = await propertyService.deleteProperty(
            propertyId,
            req.user
        );

        if (!deletedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
        console.error("Error occurred while deleting property:", error);
        res.status(500).json({
            message: "Error occurred while deleting property",
            error: error.message,
        });
    }
};


const getProperties = async (req, res) => {
  
    if (req.user_role !== "Seller") {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    try {
        const properties = await propertyService.getProperties(req.user);
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

const getPropertyById = async (req, res) => {
    if (req.user_role !== "Seller") {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    try {
        const propertyId = req.params.id;
        const property = await propertyService.getPropertyById(
            propertyId,
            req.user
        );
        res.status(200).json({
            message: "Property fetched successfully",
            data: property,
        });
    } catch (error) {
        console.error("Error occurred while fetching properties:", error);
        res.status(500).json({
            message: "Error occurred while fetching properties",
            error: error.message,
        });
    }
};
const getInterestedUsers = async (req, res) => {
    if (req.user_role !== "Seller") {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    try {
        const propertyId = req.params.id;
        const interestedUsers = await propertyService.getInterestedUsers(
            propertyId,
            req.user
        );

        if (!interestedUsers) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.status(200).json({
            message: "Interested Users fetched successfully",
            data: interestedUsers,
        });
    } catch (error) {
        console.error("Error occurred while fetching interested users:", error);
        res.status(500).json({
            message: "Error occurred while fetching interested users",
            error: error.message,
        });
    }
};

module.exports = {
    addProperty,
    updateProperty,
    deleteProperty,
    getProperties,
    getInterestedUsers,
    getPropertyById,
};
