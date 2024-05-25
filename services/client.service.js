const fs = require("fs");
const path = require("path");
const Property = require("../models/property");
const User = require("../models/user");
const nodemailer = require("nodemailer");

const getPropertiesService = async () => {
    return await Property.find();
};

const likePropertyService = async (propertyId, user) => {
    const property = await Property.findOne({ _id: propertyId });
    if (!property) {
        throw new Error("Property not found");
    }
    if (property.likes.includes(propertyId)) {
        throw new Error("Property already liked");
    }
    property.likes.push(propertyId);
    return await property.save();
};

const unlikePropertyService = async (propertyId, user) => {
    const property = await Property.findOne({ _id: propertyId });
    if (!property) {
        throw new Error("Property not found");
    }
    if (!property.likes.includes(propertyId)) {
        throw new Error("Property not liked");
    }
    property.likes = property.likes.filter((u) => u != propertyId);
    return await property.save();
};

const imInterestedService = async (userId,propertyId, userEmail) => {
    const property = await Property.findOne({ _id: propertyId });
    if (!property) {
        throw new Error("Property not found");
    }
    if (property.interested.includes(userId)) {
        throw new Error("Already interested");
    }
    property.interested.push(userId);

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.email,
            pass: process.env.pass
        },
    });

    const propertyDetails = `
        <h3>Property Details</h3>
        <p><strong>Title:</strong> ${property.title}</p>
        <p><strong>Description:</strong> ${property.description}</p>
        <p><strong>Address:</strong> ${property.address.street}, ${
        property.address.city
    }, ${property.address.state}, ${property.address.postalCode}, ${
        property.address.country
    }</p>
        <p><strong>Price:</strong> ${property.price}₹</p>
        <p><strong>rooms:</strong> ${property.bedrooms}</p>
        <p><strong>Bathrooms:</strong> ${property.bathrooms}</p>
        <p><strong>Size:</strong> ${property.squareFeet} sq ft</p>
        <p><strong>Amenities:</strong> ${property.amenities}</p>
        <p><strong>Availability Date:</strong> ${new Date(
            property.availabilityDate
        ).toDateString()}</p>
        <p><strong>Interested Users:</strong> ${property.interested.length}</p>
    `;

    const user = await User.findOne({ user_email: userEmail });
    const owner = await User.findOne({ user_email: property.owner });
    const userEmailTemplate = fs.readFileSync(
        path.join(__dirname, "../templates/userTemplate.html"),
        "utf8"
    );
    const userHtml = userEmailTemplate
        .replace("{{user_name}}", user.user_name)
        .replace("{{property_details}}", propertyDetails)
        .replace("{{owner_name}}", owner.user_name)
        .replace("{{owner_mobile}}", owner.user_mobile)
        .replace("{{owner_email}}", owner.user_email);

    const mailOptions = {
        from: process.env.email,
        to: userEmail,
        subject: `Property Details: ${property.title}`,
        html: userHtml,
    };

    await transporter.sendMail(mailOptions);
    const ownerEmailTemplate = fs.readFileSync(
        path.join(__dirname, "../templates/ownerTemplate.html"),
        "utf8"
    );
    const ownerHtml = ownerEmailTemplate
        .replace("{{owner_name}}", owner.user_name)
        .replace("{{user_name}}", user.user_name)
        .replace("{{user_mobile}}", user.user_mobile)
        .replace("{{user_email}}", user.user_email)
        .replace("{{property_details}}", propertyDetails);

    const ownerMailOptions = {
        from: process.env.email,
        to: property.owner,
        subject: `Interested User: ${user.user_name}`,
        html: ownerHtml,
    };

    await transporter.sendMail(ownerMailOptions);

    return await property.save();
};

const getInterestedPropertiesService = async (userEmail, userId) => {
   
    return await Property.find({ interested: { $in: [userId] } });
};

const getLikedPropertiesService = async (userEmail) => {
    return await Property.find({ likes: { $in: [userEmail] } });
};

const getOwnerDetailsService = async (ownerId) => {
    return await User.findOne({ _id: ownerId }, { user_password: 0 });
};

const getDashboardDataService = async (userEmail) => {
    const user = await User.findOne(
        { user_email: userEmail },
        { user_password: 0 }
    );
    const propertiesInterested = await Property.find({
        interested: { $in: [userEmail] },
    });
    const propertiesLiked = await Property.find({
        likes: { $in: [userEmail] },
    });
    const countInterest = propertiesInterested.length;
    const countLike = propertiesLiked.length;
    return { user, countInterest, countLike };
};

module.exports = {
    getPropertiesService,
    likePropertyService,
    unlikePropertyService,
    imInterestedService,
    getInterestedPropertiesService,
    getLikedPropertiesService,
    getOwnerDetailsService,
    getDashboardDataService,
};
