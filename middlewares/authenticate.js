const httpStatus = require("http-status");
const JWT = require("jsonwebtoken");

const authenticateToken = (req,res,next) =>{
    const authHeader = req.headers["authorization"];
    // console.log(req.headers)
    const token = authHeader.split(" ")[1]

    if(token == null) {
        return res.status(httpStatus.UNAUTHORIZED).send({error : "Bu işlemi yapmak için yetkiniz yok.Lütfen giriş yapınız!!"})
    }

    JWT.verify(token , process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if(err) return res.status(httpStatus.FORBIDDEN).send({error : "Token süresi geçmiş..."})

        req.user = user;
        next()
    })

}

module.exports = authenticateToken