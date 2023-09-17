import Joi from "joi";

export const schemaUser = Joi.object().keys({
    username:Joi.string().min(4).max(10),
    password:Joi.string().min(6),
    roles:Joi.array().items(Joi.string().valid('admin','user')).required()
}) 
//.pattern(/^[a-zA-Z]+$/,'name')
export const schemaUserYuri = Joi.object({
    username:Joi.string().alphanum().required(),
    password: Joi.string().alphanum().min(6).required(),
    roles:Joi.array().items(Joi.string().valid('admin','user')).required()
})