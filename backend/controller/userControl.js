const { loginUser } = require("./../service/userService");
const { config } = require("./../config/config");
const { userModal } = require  ("./../models/userModal.js");



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
  const {email} = req.body;

  const user = await UserModel.findOne({email:email});

  if (user) 
    return res.status(200).json({
      success: true,
      message: `Welcome, ${user.firstName+" "+user.lastNmae}`,
    });

  if (!firstName || !lastName || !email || !image || !password)
    return next(new ErrorHandler("Please add all fields", 400));

  user = await userModal.create({
    firstName,
    lastName,
    email,
    password,
    userId:_id,
    image,
    userType:"user",
    cart:[]
  });

  return res.status(201).json({
    success: true,
    message: `Welcome, ${user.firstName}`,
  });
};
module.exports = {
  userLogin,signUp
};
