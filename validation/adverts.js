const Joi = require("joi")

const advertValidation = Joi.object({
    title : Joi.string().min(5).required(),
    description : Joi.string().min(5).required(),
    price : Joi.string().min(2).required(),
    infos : Joi.object().keys({
        roomCount : Joi.string().min(1),
        areaMeasureNet : Joi.string().min(2).required(),
        areaMeasureBrt : Joi.string(),
        levelOn : Joi.string(),
        levelAll : Joi.string(),
        buildAge : Joi.string(),
        heating : Joi.string(),
        furnished : Joi.string()
    }),
    adress : Joi.object().keys({
        city : Joi.string(),
        district : Joi.string(),
        hood : Joi.string(),
        detail : Joi.string()
    }),
    rentOrBuy : Joi.string(),
    advert_images : Joi.array()
})

module.exports = {
    advertValidation
}
