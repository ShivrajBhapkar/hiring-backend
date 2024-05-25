const Property = require("../models/property");
const User = require("../models/user");

const addProperty = async (propertyData, user) => {
    const newProperty = new Property({
        ...propertyData,
        owner: user,
    });

    return await newProperty.save();
};

const updateProperty = async (propertyId, propertyData, user) => {
    const property = await Property.findOne({ _id: propertyId, owner: user });
    if (!property) {
        return null;
    }

    Object.assign(property, propertyData, { updatedAt: Date.now() });
    return await property.save();
};
const getPropertyById = async (propertyId, user) => {
    const property = await Property.findOne({ _id: propertyId, owner: user });
     if (!property) {
         return null;
    }
    return property;
}

const deleteProperty = async (propertyId, user) => {
    return await Property.findOneAndDelete({ _id: propertyId, owner: user });
};

const getDashboardData = async (user) => {
    const userInfo = await User.findOne(
        { user_email: user },
        { user_password: 0 }
    );
    const propertiesPosted = await Property.find({ owner: user });
    const countProperties = propertiesPosted.length;
    const countInterest = propertiesPosted.reduce(
        (acc, property) => acc + property.interested.length,
        0
    );

    return { user: userInfo, countProperties, countInterest };
};

const getProperties = async (user) => {
    return await Property.find({ owner: user });
};

const getInterestedUsers = async (propertyId, user) => {
    const property = await Property.findOne({ _id: propertyId, owner: user });
    if (!property) {
        return null;
    }

    const interestedUsers = [];
    for (const userEmail of property.interested) {
        const user = await User.findOne(
            { user_email: userEmail },
            {
                user_password: 0,
                role: 0,
                createdAt: 0,
                user_status: 0,
                resetPasswordToken: 0,
            }
        );
        interestedUsers.push(user);
    }

    return interestedUsers;
};
module.exports = {
    addProperty,
    updateProperty,
    deleteProperty,
    getDashboardData,
    getProperties,
    getInterestedUsers,
    getPropertyById,
};
