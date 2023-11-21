const User = require("../models/users");

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

module.exports={
    newUser,
    loginUser,
    updatePassword
}