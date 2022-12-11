const { user } = require("./schema")

module.exports = {
    addUserValidation: async (req, res, next) => {
        const value =  user.validate(req.body);
        if (value.error) {
            res.status(400).json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    }
}