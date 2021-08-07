require('dotenv').config()
const express = require('express');
const app = express();
const ejs = require('ejs');
const nodemailer = require('nodemailer');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public")); // Para colocar la carpeta public con css, img
app.use(express.json());

app.get('/', function(req, res){
    res.render("home");
});

app.post('/', function(req, res){
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CLIENT_EMAIL,
            pass: process.env.CLIENT_PASSWORD
        }
    })

    const mailOptions = {
        from : req.body.email,
        to: process.env.CLIENT_EMAIL,//Email de arriba,
        subject:`Message from ${req.body.email} : ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.error(err);
            res.send('err');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    })
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});