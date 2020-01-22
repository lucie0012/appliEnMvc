const Post = require("../database/models/Article");
// création de la variable "Post" qui va récupérer notre model qui est dans le dossier database


module.exports = async (req, res) => {
    // la requête va se synchroniser avec une BDD en méthode asynchrone (peut gérer plusieurs requêtes en même temps)

        const article = await Post.findById(req.params.id)
        // on créé une variable qui permet d'attendre le retour de la requête ("await") 
        // "req.params" : je récupère les paramètres de cette url (infos du req) : ici nous renvoi l'id saisi 
        // exemple : sur le naviguateur "http://localhost:3000/articles/451vrfp,nrf" donne { id: '451vrfp,nrf' } { id: 'style.css' }

        res.render("articles", { article })
        // "article" correspond au résultat de la const : cad : cela renvoi les infos de l'article présent dans la BDD en le cherchant par son ID

        
    }

