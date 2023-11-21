const User = require("../models/users");
const path = require("path")

const loginUser = (userData) => {
    return User.findOne(userData)
}

const newUser = (userData) =>{
    const user = new User(userData)

    return user.save()
}

const updatePassword= (id,password) => {
    return User.findByIdAndUpdate({_id : id},{password : password})
}

const add_profile_image = async (id,profile_image)=>{
    const folderPath = path.join(__dirname,"../",`uploads/users`)
    const extension = path.extname(profile_image.name)
    const imageName = `${id}${extension}`;
    const imageUrl  = `uploads/users/${imageName}`


    const response = await User.findByIdAndUpdate({_id : id},{profile_image : imageUrl}).exec()

    
    const locateImage = path.join(folderPath,imageName);

    profile_image.mv(locateImage,(err)=>{
        if(err) return err
        return "işlem başarılı"
    })

}

module.exports={
    newUser,
    loginUser,
    updatePassword,
    add_profile_image
}