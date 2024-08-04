const { userModal } = require("./../ṃodels/userModal");
const bcrypt = require('bcrypt');

const loginUser = async ({ email, password }) => {
    try {
        const currUser = await userModal.findOne({ email: email });
        if (currUser) {
            const hashedPassword = currUser.password;
            const match = await bcrypt.compare(password, hashedPassword);
            if (match) {
                return currUser;
            }
        }
        return null;
    } catch (error) {
        console.log("Error in loginUser", error);
        throw error;
    }
}
const signUpUser = async ({ firstName, lastName, image, password, email }) => {
    try {
        const isUserExist = await userModal.findOne({ email: email });

        if (isUserExist) {
            return null;
        }

        const hashedPassword = await hashingPassword(password);
        const userId = await generateUniqueUserId();
        const userData = {
            firstName,
            lastName,
            image,
            email,
            password: hashedPassword,
            userId,
            userType: "user",
            cart: [],
            isActive: 1
        }
        console.log(userData);
        const newUser = await userModal.create(userData);

        if (newUser) {
            console.log(newUser);
            return newUser;
        }
        return null;
    } catch (error) {
        console.error('Error in signUpUser:', error);
        throw error;
    }
}
const generateUniqueUserId = async () => {
    try {
        let highestUserId = await userModal.findOne({}, { userId: 1 }).sort({ userId: -1 });
        if (highestUserId) {
            return highestUserId.userId + 1;
        } else {
            return 1; // Start from 1 if no users exist
        }
    } catch (error) {
        console.error('Error in generateUniqueUserId:', error);
        throw error;
    }
}

const hashingPassword = async (password) => {
    try {
        const saltRounds = 10;
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    } catch (error) {
        console.error('Error in hashingPassword:', error);
        throw error;
    }
}

const userData = async (userId) => {
    try {
        if (!userId) {
            return null;
        }
        const info = await userModal.findOne({ userId: userId });
        if (!info) {
            return null;
        }
        const data = {
            userId: info?.userId,
            firstName: info?.firstName,
            lastName: info?.lastName,
            email: info?.email,
            userType: info?.userType,
            cart: info?.cart,
            isActive: info?.isActive
        }
        return data;
    } catch (error) {
        console.log("Error in userData", error);
        return null;
    }
}
module.exports = {
    loginUser,
    signUpUser,
    userData
};