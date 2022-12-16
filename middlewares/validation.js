const { user } = require("./schema")

module.exports = {
    addUserValidation: async (req, res, next) => {
        const value =  user.validate(req.body);
        if (value.error) {
            let msg =  value.error.details[0].message;
            res.status(400).json({
                success: false,
                message: msg.replaceAll("\"","")
            })
        } else {
            next();
        }
    }
}