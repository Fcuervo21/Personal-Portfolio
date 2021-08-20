require('dotenv').config()
const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const ejs = require('ejs');
const nodemailer = require('nodemailer');

app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public")); // Para colocar la carpeta public con css, img
app.use(express.json());

app.get('/', function(req, res){
    res.render("home", {
        alertStatus: undefined
});
});

app.post('/', [
    body('name', '  Full name must be 3+ characters long  ')
            .exists()
            .isLength({ min: 2 }),
    body('email', '  Email is not valid  ')
            .exists()
            .isEmail()
            .normalizeEmail(),
    body('subject', '  Subject must be 5+ characters long  ')
            .exists()
            .isLength({ min: 5 }),
    body('message', '  Message must be 10+ characters long  ')
            .exists()
            .isLength({ min: 10 })
                ],function(req, res){
                
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log(req.body)
            const valores = req.body;
            const validaciones = errors.array();
            const errorsArray = []
            validaciones.forEach((validacion) => {
                errorsArray.push(validacion.msg);
            });
            res.render('home', {validaciones: errorsArray, valores:valores, alertStatus: undefined})
        }
        else {
            // console.log(req.body);
            let transporter = nodemailer.createTransport({
                host: process.env.CLIENT_HOST,
                port: process.env.CLIENT_PORT,
                secure: false,
                auth: {
                    user: process.env.CLIENT_EMAIL,
                    pass: process.env.CLIENT_PASSWORD
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false,
                  },
            });


            const mailOptions = {
                from : process.env.CLIENT_EMAIL,
                to: process.env.CLIENT_EMAIL,//Email de arriba,
                subject:`Message from ${req.body.email} : ${req.body.subject}`,
                text: req.body.message
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    // console.error(err);
                    res.send('err');
                } else {
                    // console.log('Email sent: ' + info.response);
                    res.render('home', {alertStatus: true});
                }
            });
        }
           
});
app.listen(app.get('port'), function () {
    console.log("Server started on port", app.get('port'));
});