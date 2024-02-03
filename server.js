//************************************************************************* */
//Ce code représente la configuration et le lancement d'un serveur Node.js 
//qui utilise l'application Express définie dans le fichier app.js.
//************************************************************************ */
//Importe l'application Express depuis le fichier app.js.
//Utilise le module debug pour faciliter le débogage.
//Importe le module http pour créer un serveur HTTP.
const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

//Fonction utilitaire pour normaliser un port en tant que numéro ou chaîne (pour les tuyaux nommés).
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

//Fonction de gestion des erreurs lors de la création du serveur.
//Gère différents types d'erreurs et affiche des messages appropriés.
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Fonction appelée lorsque le serveur commence à écouter les requêtes.
//Affiche des informations de débogage indiquant sur quel port le serveur écoute.
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

//Normalise le port à utiliser en utilisant la fonction normalizePort.
//Configure le port dans l'application Express.
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//Crée un serveur HTTP en utilisant l'application Express.
const server = http.createServer(app);

//Associe des gestionnaires d'événements pour les événements d'erreur et d'écoute du serveur.
server.on("error", onError);
server.on("listening", onListening);

//Met en écoute le serveur sur le port spécifié.
server.listen(port);

//********************************************************************************************** */
//En résumé, ce code configure un serveur Node.js avec Express, gère les erreurs potentielles 
//lors du lancement, et affiche des informations de débogage sur le port d'écoute. 
//Il crée un serveur HTTP qui utilise l'application Express et le met en écoute sur le port 
//spécifié (par défaut 3000).
//********************************************************************************************** */