const httpStatus = require("http-status");
const { newUser, loginUser, updatePassword } = require("../services/users")
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../utils/scripts/helper")

const index = (req,res)=>{
    res.status(httpStatus.OK).send("login_req");

    
}

const login = (req,res)=>{
    
    req.body.password = passwordToHash(req.body.password)

    loginUser(req.body).then((user)=>{
        if(!user) return res.status(httpStatus.BAD_REQUEST).send({hata : "Kullanıcı bulunamadı"})
           
        user = {
            ...user.toObject(),
            access_token : generateAccessToken(user),
            refresh_token : generateRefreshToken(user)
        }
        
        user.password = "not show"
        return res.status(httpStatus.OK).send(user);
        
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

const changePassword = (req,res) => {
    //! Şifre değişimi database yazılacak
    req.body.password = passwordToHash(req.body.password)

    const id = req.params._id
    const password =req.body.password

    updatePassword(id,password).then((update_response)=>{
        res.status(httpStatus.OK).send("Şifre başarılı bir şekilde değiştirildi...")
    }).catch((err) => {
        res.status(httpStatus.BAD_REQUEST).send({error : "Şifre değiştirilirken bir hata oluştu..."})
    })

}

const profileImageUpload = (req , res)=>{
    console.log(req.files)
    console.log(req.params._id)
}

module.exports = {
    index,
    create,
    login,
    changePassword,
    profileImageUpload
}