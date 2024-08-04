const { loginUser, signUpUser, userData } = require("./../service/userService");
const { config } = require("./../config/config");
const jwt = require('jsonwebtoken');

const userLogin = async (req, res) => {
    try {
        const userDetail = req.body;
        const userData = await loginUser(userDetail);
        if (userData) {
            console.log(userData);
            const payload = {
                userId: userData.userId,
            };
            const secretKey = config.ACCESS_TOKEN_SECRET_KEY;
            const expiresIn = config.ACCESS_TOKEN_EXPIRY_TIME;
            const accessToken = await jwt.sign(payload, secretKey, { expiresIn });
            const result = {
                data: {
                    accessToken,
                },
                error: null,
                sucess: true,
            };
            return res.send(result);
        }
        const result = {
            data: null,
            error: "Invalid user request",
            sucess: false,
        };
        return res.send(result);
    } catch (error) {
        console.log("Error in userLogin", error);
    }
};

const signUp = async (req, res) => {
    try {
        const { firstName, lastName, image, password, email } = req.body;

        if (!firstName || !lastName || !email || !image || !password) {
            return res.status(400).json({
                data: null,
                success: false,
                error: "Enter all fields",
            });
        }

        const user = await signUpUser({ firstName, lastName, image, password, email });

        if (user)
            return res.status(201).json({
                data: {
                    message: `Welcome, ${user.firstName + " " + user.lastName}`
                },
                success: true,
                error: null,
            });

        return res.status(400).json({
            data: null,
            success: false,
            error: "User already Exist",
        });
    } catch (error) {
        console.log("Error in signUp", error)
    }
};

const userInfo = async (req, res) => {
    try {
        const accessToken = req.headers?.accesstoken;
        if (!accessToken) {
            console.log("control here")
            return res.status(401).json({
                data: null,
                success: false,
                error: "Access Token not passed",
            });
        }
        const secretKey = config.ACCESS_TOKEN_SECRET_KEY;
        const decodedToken = jwt.verify(accessToken, secretKey);
        const userId = decodedToken.userId;
        const userDetail = await userData(userId);
        if (!userDetail) {
            return res.status(500).json({
                data: null,
                success: false,
                error: "Internal server error",
            });
        }
        return res.status(200).json({
            data: userDetail,
            success: true,
            error: null,
        });
    } catch (error) {
        console.log("Error in userInfo", error);
        return res.status(401).json({
            data: null,
            success: false,
            error: "Invalid Access Token",
        });
    }
}

module.exports = {
    userLogin,
    signUp,
    userInfo
};
