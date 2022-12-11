const { userRegister, userLogin, forgetPassword, changePassword ,getUsers} = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { mailer } = require("../services/nodemailer")
const md5 = require('md5');
const { createPool, createPoolCluster } = require("mysql");

module.exports = {
    userRegister: async (req, res) => {
        try {
            let body = req.body;
            // const salt = await bcrypt.genSalt(10);
            // const hash = await bcrypt.hash(body.password, salt);
            body.password = md5(body.password);

            userRegister(body, (err, result) => {
                if (!err) {
                    if (result.length >= 0) {
                        return res
                            .status(500)
                            .json({ success: false, error: "Email Already Exists" });
                    } else {
                        return res
                            .status(200)
                            .json({ success: true, message: "Registered Successfully" });
                    }
                } else {
                    return res.status(500).json({ success: false, error: err });
                }
            });
        } catch (err) {
            return res
                .status(500)
                .json({ success: false, message: "something went wrong", error: err });
        }
    },
    userLogin: async (req, res) => {
        try {
            let user = req.body;
            userLogin(user, async (err, result) => {
                // const passwordMatch = await bcrypt.compare(user.password, result[0].password);
                if (!err) {
                    if (result.length <= 0) {
                        return res
                            .status(401)
                            .json({ success: false, message: "User not found" });
                    } else if (user.password != result.password) {
                        return res
                            .status(401)
                            .json({ success: false, message: "Incorrect Password" });
                    } else if (result.status === "false") {
                        return res
                            .status(401)
                            .json({ success: false, message: "Wait for admin approval" });
                    } else if (user.password == result.password) {
                        let response = { email: result.email, role: result.role };
                        let token = jwt.sign(response, process.env.ACCESS_TOKEN, {
                            expiresIn: "8h",
                        });
                        return res
                            .status(401)
                            .json({
                                success: true,
                                message: "Login Successfull",
                                token: token,
                                data: response,
                            });
                    } else {
                        return res
                            .status(400)
                            .json({ success: false, message: "Something went wrong" });
                    }
                } else {
                    return res.status(500).json({ success: false, message: err });
                }
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "something went wrong", error: err });
        }

    },
    forgetPassword: async (req, res) => {
        try {
            let body = req.body;
            forgetPassword(body, async (err, result) => {
                if (!err) {
                    let payload = result.password
                    // let token = jwt.sign(payload,process.env.ACCESS_TOKEN,{expiresIn:'7d'})

                    // await mailer(result)
                    return res.status(200).json({ success: true, data: result });
                } else {
                    return res.status(500).json({ success: false, message: err });
                }
            })

        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "something went wrong", error: err });
        }
    },
    changePassword: async (req, res) => {
        try {
            let body = req.body;
            body.newPassword = md5(body.newPassword)
            let email = res.locals.email;
            changePassword(email, body, (err, result) => {

                if (!err) {
                    if (result.length <= 0) {
                        return res
                            .status(200)
                            .json({ success: false, message: "Incorrect old password" });
                    } else if (result.affectedRows == 1) {
                        return res
                            .status(200)
                            .json({ success: false, message: "password updated successfully" });
                    } else {
                        return res
                            .status(500)
                            .json({ success: false, message: "Somethong went wrong" });
                    }
                } else {
                    return res
                        .status(500)
                        .json({ success: false, message: "something went wrong", error: err });
                }
            })
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "something went wrong", error: err });
        }
    },
    getUsers : async(req,res)=>{
        try {
            getUsers((err,result)=>{
                if(!err){
                    return res
                    .status(200)
                    .json({ success: false, data:result });
                }else{
                    return res
                .status(500)
                .json({ success: false, message: "something went wrong", error: err });
                }
            })
        } catch (error) {
            return res
            .status(500)
            .json({ success: false, message: "something went wrong", error: err });
        }
           
    }
   
};
