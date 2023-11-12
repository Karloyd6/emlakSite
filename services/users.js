const User = require("../models/users");

const loginUser = (userData) => {
    return User.findOne(userData)
}

const newUser = (userData) =>{
    const user = new User(userData)

    return user.save()
}

module.exports={
    newUser,
    loginUser
}