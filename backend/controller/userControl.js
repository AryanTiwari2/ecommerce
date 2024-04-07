const { loginUser, signUpUser } = require("./../service/userService");
const { config } = require("./../config/config");
const jwt = require('jsonwebtoken');
const { userModal } = require("./../ṃodels/userModal");

const userLogin = async (req, res) => {
    try {
        const userDetail = req.body;
        // console.log(userDetail);
        const userData = await loginUser(userDetail);
        if (userData) {
            console.log(userData);
            const payload = {
                userId: userData.email,
            };
            const secretKey = config.ACCESS_TOKEN_SECRET_KEY;
            const expiresIn = config.ACCESS_TOKEN_EXPIRY_TIME;
            const accessToken =  await jwt.sign(payload, secretKey, { expiresIn });
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

module.exports = {
    userLogin,
    signUp
};
