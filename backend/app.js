const express = require("express");
const Post = require('./models/post')
const mongoose = require('mongoose')

const app = express();
app.use(express.json());
mongoose.connect('mongodb+srv://mbadji1771:RakoP8mXfcmVUgId@cluster0.rx9gjzx.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Connected to atlas DB'))
.catch(()=> console.log('Connection failed'))


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  
  const post = new Post({
      title: req.body.title,
      content: req.body.content
  })
  console.log(post)
  post.save()
  res.status(201).json({
      message: 'Post added'
  })
  next()

})
// middleware
app.get("/api/posts", (req, res, next) => {
  console.log('new get')
  Post.find().then((documents) => {
    res.status(200).json({
        message: "Posts from server",
        posts: documents,
      });
  });


});
module.exports = app;
