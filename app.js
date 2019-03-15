var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restful_blog_app', {useNewUrlParser: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlEncoded({extended: true}));

var blogSchema = new mongoose.Schema({
    title: String, 
    image: String, 
    body: String,
    created: Date()
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server is running')
})