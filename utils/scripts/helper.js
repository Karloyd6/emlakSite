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

module.exports= {
    passwordToHash,
    generateAccessToken,
    generateRefreshToken
}