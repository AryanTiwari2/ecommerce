const { loginUser } = require("./../service/userService");
const { config } = require("./../config/config");

const {userModal} = require("./../ṃodels/userModal");


const userLogin = async (req, res) => {
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
};

const signUp = async (req, res) => {
  const {firstName,lastName,image,password,email,_id,userId} = req.body;
  let user = await userModal.findOne({email:email});

  if (user) 
    return res.status(200).json({
      success: true,
      message: `Welcome, ${user.firstName+" "+user.lastName}`,
    });

  if (!firstName || !lastName || !email || !image || !password){
    return res.status(400).json({
        success: false,
        message: "Enter all fields",
      });
  }

  user = await userModal.create({
    firstName,
    lastName,
    email,
    password,
    userId,
    image,
    userType:"user",
    cart:[]
  });

  return res.status(201).json({
    success: true,
    message: `Welcome, ${user.firstName}`,
  });
};
const generateUserId = () => {
    // Generate a random unique number for userId
    return Math.floor(Math.random() * 1000000); // You can adjust the range as needed
};
module.exports = {
  userLogin,signUp
};
