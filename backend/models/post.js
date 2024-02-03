//******************************************************************************************* */
//Ce code représente la définition d'un schéma de données pour les publications (posts) 
//dans une application Node.js utilisant MongoDB avec Mongoose, 
//une bibliothèque ODM (Object Data Modeling) pour MongoDB
//****************************************************************************************** */

//Importe la bibliothèque Mongoose, qui permet de simplifier l'interaction avec MongoDB en utilisant un schéma de modèle d'objet.
const mongoose = require('mongoose')

//Utilise la méthode mongoose.Schema pour définir la structure d'un schéma MongoDB.
//Le schéma a deux champs : title de type String et content de type String.
//Les propriétés required: true indiquent que ces champs sont obligatoires pour chaque document.
const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true}
})

//Utilise la méthode mongoose.model pour créer un modèle (Model) à partir du schéma défini.
//Le modèle est nommé 'Post' et est basé sur le schéma postSchema.
//Le modèle ainsi créé représente un type d'objet dans la base de données MongoDB qui respecte la structure définie dans le schéma.
module.exports = mongoose.model('Post', postSchema)

//******************************************************************************************** */
//En résumé, ce fichier définit un schéma de données MongoDB pour les publications avec 
//deux champs (title et content) en utilisant Mongoose. Le schéma est ensuite exporté sous 
//la forme d'un modèle appelé 'Post', qui peut être utilisé pour interagir avec 
//la base de données MongoDB et effectuer des opérations CRUD (Create, Read, Update, Delete) 
//sur les publications.
//********************************************************************************************** */