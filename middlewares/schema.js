const Joi = require("joi");

module.exports =  {
    user: Joi.object({
        name: Joi.string().min(3).max(100).required(),
        mobile: Joi.string().min(6).max(13).required().min(10).max(10),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        status:Joi.string(),
        role:Joi.string()
    })
};
