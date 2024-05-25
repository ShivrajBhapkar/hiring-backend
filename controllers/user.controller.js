const { userService } = require("../services");
const auth = (req, res) => {
    res.status(200).json({ message: "Welcome to the API" });
};

const login = async (req, res) => {
    const { user_email, user_password } = req.body;
    const result = await userService.login(user_email, user_password);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(401).json(result);
    }
};

const register = async (req, res) => {
    const result = await userService.register(req.body);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json(result);
    }
};

module.exports = {
    login,
    register,
    auth,
};
