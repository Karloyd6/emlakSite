const Cryptojs = require("crypto-js");

const passwordToHash = (password)=>{
    const cryptedPassword = Cryptojs.HmacSHA256(password,process.env.PASSWORD_HASH_KEY);

    return cryptedPassword;
}

module.exports= {
    passwordToHash
}