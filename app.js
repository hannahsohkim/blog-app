var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// APP CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app', {useNewUrlParser: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));



// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String, 
    image: String, 
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//     title: "My First Blog", 
//     image: 'https://images.unsplash.com/photo-1551636898-47668aa61de2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
//     body: "I'm so excited to be writing and publishing my first blog post! Can't wait to start posting more and building this blog out. Thanks for reading!",
// });




//RESTFUL ROUTES
app.get('/', (req, res) => {
    res.redirect('/blogs');
})

// INDEX - List all blogs
app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log("ERROR", err)
        } else {
        res.render('index', {blogs: blogs});
        }
    })
})

// NEW ROUTE
app.get('/blogs/new', (req, res) => {
    res.render('new');
})

// CREATE ROUTE
app.post('/blogs', (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            res.render('new');
        } else {
             res.redirect('/blogs');
        }
    })
})

// SHOW ROUTE 
app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('show', {blog: foundBlog});
        }
    })
})

// EDIT ROUTE 
app.get('/blogs/:id/edit', (req, res) => {
    
})




app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server is running')
})