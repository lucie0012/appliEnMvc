const mongoose = require('mongoose');
// on récupère notre paquet/dépendance "mongoose" pour l'utiliser

const ArticleSchema = new mongoose.Schema ({
// création du shéma pour la bdd "article"

// dès qu'on veut qu'une donnée puisse être récupérée il faut bien ajouter au modèle non nom et son type

    title: String,
    content: String,
    author : String,
    image : String,
    createDate : {
        type: Date,
        default : new Date(),
    }
    // il va créer la date au moment où je créé l'article

})

const Article = mongoose.model('Article', ArticleSchema)
// créer un model

module.exports = Article
// on exporte tout ça via "Article" afin de pouvoir récupérer le modèle dans différents projets
