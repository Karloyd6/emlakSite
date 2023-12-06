const httpStatus = require("http-status");
const JWT = require("jsonwebtoken");
const User = require("../models/users")

const authenticateToken = (req,res,next) =>{
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1]

    try {
        if(!token) {
            return res.status(httpStatus.UNAUTHORIZED).send({error : "Bu işlemi yapmak için yetkiniz yok.Lütfen giriş yapınız!!"})
        }
    
        JWT.verify(token , process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
            if(err) return res.status(httpStatus.UNAUTHORIZED).send({error : "Token süresi geçmiş..."})
            req.user =  User.findById(user);
            next()
        })
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).send({succeeded : false, error : "No authorization"})
    }
    

}

module.exports = authenticateToken
