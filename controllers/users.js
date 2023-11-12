const httpStatus = require("http-status");
const { newUser, loginUser } = require("../services/users")
const { passwordToHash } = require("../utils/scripts/helper")

const index = (req,res)=>{
    res.status(httpStatus.OK).send("login_req");

    
}

const login = (req,res)=>{
    
    req.body.password = passwordToHash(req.body.password)

    loginUser(req.body).then((login_res)=>{
        if(login_res !== null){
           return res.status(httpStatus.OK).send(login_res);
        }
        console.log(login_res)
        return res.status(httpStatus.BAD_REQUEST).send({hata : "Kullanıcı bulunamadı"})
        
    }).catch((err)=>{
        res.status(httpStatus.NOT_FOUND).send("Kullanıcı Bulunamadı");
    })
}

const create = (req,res)=>{
    
    req.body.password = passwordToHash(req.body.password)
    

    newUser(req.body).then((user_req)=>{
        res.status(httpStatus.CREATED).send(user_req);
    }).catch((err)=>{
        res.status(httpStatus.BAD_REQUEST).send({"error" : err});
    })

}

module.exports = {
    index,
    create,
    login
}