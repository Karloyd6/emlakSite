const httpStatus = require("http-status");
// const { userFileMaker } = require("../utils/scripts/manageFile.js")
const { newUser, loginUser, updatePassword,add_profile_image, update_user } = require("../services/users")
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../utils/scripts/helper")

const index = (req,res)=>{
    
    // console.log('req.body :>> ', req.params._id);
    loginUser({_id : req.params._id}).then((user_response)=>{
        user_response.password = null
        console.log(user_response)
        res.status(httpStatus.OK).send(user_response);
    }).catch((err) => {
        res.status(httpStatus.BAD_REQUEST).send({error : "Kullanıcı bulunamadı"})
    })
    
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
        // console.log(user)
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

const profileImageUpload = (req, res)=>{
    const id = req.params._id
    const profile_image = req.files.profile_image


    add_profile_image(id,profile_image).then((image_response)=>{
        // console.log("img",image_response.profile_image)
        
        res.status(httpStatus.CREATED).send(image_response.profile_image)
    })
    

}

const updateUser = (req,res)=>{
    const id = req.params._id;
    const data = req.body

    update_user(id,data).then((update_response)=> {
        res.status(httpStatus.CREATED).send(update_response)
    }).catch((err)=>{
        res.status(httpStatus).send("Hata : Kullanıcı veri tabanına eklenirken bir sourn oluştu!")
    })

}

module.exports = {
    index,
    create,
    login,
    changePassword,
    profileImageUpload,
    updateUser
}