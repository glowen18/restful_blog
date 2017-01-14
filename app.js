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
//title
//image
//body
//createdß

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log("Blog server has started!");
});
