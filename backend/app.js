//Ce code représente le côté serveur d'une application Angular utilisant Node.js, Express, et MongoDB.

//Importe les modules nécessaires : express pour le framework web, Post pour 
//le modèle de données des publications, et mongoose pour interagir avec MongoDB.
const express = require("express");
const Post = require('./models/post')
const mongoose = require('mongoose')

//Initialise une application Express.
//Utilise le middleware express.json() pour analyser les données JSON dans les requêtes.
//Se connecte à la base de données MongoDB en utilisant mongoose.
const app = express();
app.use(express.json());
mongoose.connect('mongodb+srv://mbadji1771:RakoP8mXfcmVUgId@cluster0.rx9gjzx.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Connected to atlas DB'))
.catch(()=> console.log('Connection failed'))

//Middleware qui gère les en-têtes CORS pour permettre les requêtes depuis n'importe quelle origine (*).
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

//Un point de terminaison POST qui crée et sauvegarde une nouvelle publication dans 
//la base de données à partir des données de la requête JSON.
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
//Un point de terminaison GET qui récupère toutes les publications depuis 
//la base de données MongoDB et les renvoie sous forme de réponse JSON.
app.get("/api/posts", (req, res, next) => {
  console.log('new get')
  Post.find().then((documents) => {
    res.status(200).json({
        message: "Posts from server",
        posts: documents,
      });
  });


});

//Exporte l'application Express afin qu'elle puisse être utilisée dans d'autres parties de l'application.
module.exports = app;

//**************************************************************************************** */
//Ce code expose un serveur simple avec des points de terminaison pour 
//ajouter et récupérer des publications à partir d'une base de données MongoDB. 
//Les CORS sont gérés pour permettre les requêtes depuis n'importe quelle origine, 
//et le serveur est configuré pour utiliser JSON pour les données.
//************************************************************************************** */