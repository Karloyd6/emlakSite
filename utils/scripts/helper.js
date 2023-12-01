const Cryptojs = require("crypto-js");
const JWT = require("jsonwebtoken");

const passwordToHash = (password)=>{
    const cryptedPassword = Cryptojs.HmacSHA256(password,process.env.PASSWORD_HASH_KEY).toString();

    return cryptedPassword;
}

const generateAccessToken = (user)=>{
    return JWT.sign({foo: user},process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn : "3h"})
}
const generateRefreshToken = (user)=>{
    return JWT.sign({foo: user},process.env.REFRESH_TOKEN_SECRET_KEY)
}

const generateAdvertId = ()=>{
        const length = 8;
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    
    
   
}

module.exports= {
    passwordToHash,
    generateAccessToken,
    generateRefreshToken,
    generateAdvertId
}