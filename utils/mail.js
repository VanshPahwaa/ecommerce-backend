const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: 'vanshpahwa77@gmail.com',
        pass: 'jcpx nmqn gppb kfli'
    }
})

let mailOptions = {
    from: "Ecommerce <vanshpahwa77@gmail.com>",
    to: "vanshjeet77@gmail.com",
    subject: "sending  Email for password Reset",
    text: "is it recieved"
};





 const sendMail = async (sendingData) => {
    try {
        const { to, subject, text, html } = sendingData
        const info = await transporter.sendMail({
            from: "Ecommerce <vanshpahwa77@gmail.com>",
            to,
            subject,
            text,
            html
        })
        // console.log(info.response)
        return info
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports={sendMail}