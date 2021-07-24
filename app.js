const express = require('express');
const app = express();
const ejs = require('ejs');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public")); // Para colocar la carpeta public con css, img



app.get('/', function(req, res){
    res.render("home");
});


app.listen(3000, function () {
    console.log("Server started on port 3000");
});