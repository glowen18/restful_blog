var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE / MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES
//Root Route
app.get("/", function(req, res){
  res.redirect("/blogs");
});

//Index - GET list of all blogSchema
app.get("/blogs", function(req, res){
  //add Index functionality
  Blog.find({}, function(err, blogs){
    if(err){
      console.log("Error!");
    } else {
      res.render("index", {blogs: blogs});
    }
  });
});

//NEW Route
app.get("/blogs/new", function(req, res){
  res.render("new");
});

//CREATE Route
app.post("/blogs", function(req, res){
  //create BLOG
  Blog.create(req.body.blog, function(err, newBlog){
    if(err){
      console.log(err);
    } else {
      res.redirect("/blogs");
    }
  });
});

//SHOW Route
app.get("/blogs/:id", function(req, res){
  //FIND one blog by ID
  Blog.find(req.body.blog, function(err, foundBlog){
    if(err) {
      console.log(err);
    } else {
      res.render("show", {blog: foundBlog});
    }
  })
});




app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log("Blog server has started!");
});
