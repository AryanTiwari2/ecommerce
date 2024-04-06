const {loginUser} = require('./../service/userService');
const {config} = require("./../config/config");
const userLogin = async (req, res)=>{
    const userDetail = req.body;
    console.log(userDetail);
    const userData = await loginUser(userDetail);
    if(userData){
        console.log(userData);
        const payload={
            userId:userData.email
        }
        const secretKey = config.ACCESS_TOKEN_SECRET_KEY;
        const expiresIn = config.ACCESS_TOKEN_EXPIRY_TIME;
        const accessToken = await jwt.sign(payload, secretKey, {expiresIn});
        const result  = {
            data:{
                accessToken
            },
            error:null,
            sucess:true
        }
       return res.send(result);
    }
    const result  = {
        data:null,
        error:"Invalid user request",
        sucess:false
    }
   return res.send(result);
};

module.exports={
    userLogin
}