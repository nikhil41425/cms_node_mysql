const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')

module.exports = {

    mailer: async (data) => {
        let file = fs.readFileSync(
            path.join(__dirname,"../html","email.html"),"utf-8"
        )
        let template = file
        .replace("$$FULLNAME$$",data.name)
        .replace("$$EMAIL$$",data.email)
        .replace("$$PASSWORD$$",data.password)


        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 465,
            secure: true, // true for 465, false for other ports
            service:"gmail",
            auth: {
                user: process.env.FROM_EMAIL, 
                pass: process.env.FROM_PASSWORD
            },
        })

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.FROM_EMAIL, // sender address
            to: data.email, // list of receivers
            subject: "Hello ✔", // Subject line
            // text: "Hello world?", // plain text body
            html: template // html body
        });

        console.log("Message sent: %s", info.messageId);

    }

}