import Joi from "joi";

export const schemaUser = Joi.object({
    username:Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).required(),
    roles:Joi.array().items(Joi.string().valid('admin','user')).required()
})