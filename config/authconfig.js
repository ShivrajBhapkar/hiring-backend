const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized Access: No Token",
            });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, validate) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({
                        message: "Unauthorized Access: Token Expired",
                    });
                } else {
                    return res.status(401).json({
                        message: "Unauthorized Access: Invalid Token",
                        error: err.message,
                    });
                }
            }

            // Token is valid
            req.user = validate.user_email;
            req.user_role = validate.role;
            req.token = token;
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error Occurred While Verifying Token",
            error: error.message,
            status: 0,
        });
    }
}

module.exports = { verifyToken };
