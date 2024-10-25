const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Nodemailer transporter setup (using Gmail as an example)
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: 'wilson@dieseldown.com', // Replace with your email address
        pass: process.env.GMAIL   // Replace with your email password or an app-specific password
    }
});

//@route POST api/contact
//@desc Send a message
//@access Public
router.post('/', (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    // Simple validation (you can expand this as needed)
    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Please fill in all required fields.' });
    }

    // Set up email options
    const mailOptions = {
        from: email,
        to: 'wilson@dieseldown.com',
        subject: subject || 'New Contact Us Message',
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Subject: ${subject}
            Message: ${message}
        `
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ msg: 'Failed to send the message. Please try again later.' });
        }
        res.status(200).json({ msg: 'Thank you for contacting us! We will get back to you soon.' });
    });
});

module.exports = router;
