const fs = require("fs");
const path = require("path");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const login = async (user_email, user_password) => {
    const user = await User.findOne({ user_email });

    if (!user) {
        return { success: false, message: "Authentication failed", status: 0 };
    }

    const passwordMatch = bcrypt.compareSync(user_password, user.user_password);

    if (!passwordMatch) {
        return {
            success: false,
            message: "Authentication failed incorrect credentials",
            status: 0,
        };
    }

   

         await user.save();
    

    const token = jwt.sign(
        { user_email: user_email, role: user.user_role },
        (process.env.JWT_SECRET),
        { expiresIn: "8h" }
    );

    return { success: true, token, user };
};

const register = async (userData) => {
    try {
        const {
            user_name,
            user_email,
            user_password,
            user_mobile,
            user_gender,
            user_role,
        } = userData;

        // Check if the email already exists
        const existingUser = await User.findOne({ user_email });
        if (existingUser) {
            return {
                success: false,
                message: "Email already registered",
                status: 0,
            };
        }  else {
            // Create a new user
            const newUser = new User({
                user_name,
                user_email,
                user_password: bcrypt.hashSync(user_password, 10),
                user_mobile,
                user_gender,
                user_role,
            });

            // Save the user to the database
            await newUser.save();

            return {
                success: true,
                message: "User registered successfully. Confirmation email sent.",
                status: 1,
                user: newUser,
            };
        }
    } catch (error) {
        console.error("Error in user registration: ", error);
        return { success: false, message: "Internal Server Error" };
    }
};



module.exports = {
    login,
    register,
};
