const Joi = require("joi")

const advertValidation = Joi.object({
    title : Joi.string().min(5).required(),
    description : Joi.string().min(5).required(),
    price : Joi.string().min(2).required(),
    adress : Joi.object().keys({
        city : Joi.string(),
        county : Joi.string(),
        district : Joi.string(),
        hood : Joi.string(),
        detail : Joi.string()
    }),
    info : {
        room: Joi.string(),
        m2: Joi.string(),
        bath: Joi.string(),
        floor: Joi.string(),
        allFloor: Joi.string(),
        buildAge: Joi.string(),
        heating: Joi.string(),
        front: Joi.string(),
        exchange: Joi.string(),
        credit: Joi.string()
    },
    location: {
        lat : Joi.number(),
        lng : Joi.number()
    },
    advert_images : Joi.array(),
    user: Joi.string().required(),
    type : Joi.string().required(),
    rentOrBuy : Joi.string(),
    showcase : Joi.boolean()
})

module.exports = {
    advertValidation
}
