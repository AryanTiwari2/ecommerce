const {userModal} = require("./../ṃodels/userModal");
const bcrypt = require('bcrypt');

const loginUser = async({email,password})=>{
    const currUser = await userModal.findOne({email:email});
    if(currUser)
    {
        const hashedPassword = currUser.password;
        const match = await bcrypt.compare(password,hashedPassword);
        if(match){
            return currUser;
        }
    }
    return null;
}

module.exports={loginUser};