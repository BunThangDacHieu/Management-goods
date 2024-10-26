const nodemailer = require('nodemailer');
require('dotenv').config();
const sendEmail = async ({ email, subject, message }) => {
    try {
        // Create transporter with more detailed config
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Recommend using App Password if using Gmail
            },
            tls: {
                rejectUnauthorized: false // Helpful in development
            }
        });

        const mailOptions = {
            from: `"LogisTech" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            text: message,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email: ', error);
        throw new Error('Error sending email');
    }
};
module.exports = sendEmail;