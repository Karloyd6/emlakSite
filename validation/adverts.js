const Joi = require("joi")

const advertValidation = Joi.object({
    title : Joi.string().min(5).required(),
    description : Joi.string().min(5).required(),
    price : Joi.string().min(2).required(),
    adress : Joi.object().keys({
        city : Joi.string(),
        district : Joi.string(),
        hood : Joi.string(),
        detail : Joi.string()
    }),
    advert_images : Joi.array(),
    user: Joi.string().required(),
    type : Joi.string().required(),
    rentOrBuy : Joi.string()
})

module.exports = {
    advertValidation
}
