const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contactRoutes");
const contactApiRoutes = require("./routes/api/contactApiRoutes");

// charge le fichier de configuration
dotenv.config();

// récupère l'application express
const app = express();

// défini le moteur de template
app.set("view engine", "ejs");

// défini l'emplacement des vues
app.set("views", __dirname + "/views");

// supprime le message DeprecationWarning
mongoose.set('strictQuery', true);

// effectue la connexion à MongoDB
mongoose.connect(process.env.MONGO_CONNECTION,
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connexion à MongoDB a réussie"))
.catch((error) => console.log("Connexion à MongoDB a échouée" + error));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// routes
app.use('/', contactRoutes);


// si la page n'existe pas
app.use((req, res) => {
    res.status(404);
    res.send("Page introuvable");
});

// lance le serveur express
app.listen(8080, () => {
    console.log("Le serveur est démarré 8080");
});
