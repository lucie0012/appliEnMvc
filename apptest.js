const mongoose = require("mongoose");

const Article = require("./database/models/Article");

mongoose.connect("mongodb://localhost:27017/blog-test");

Article.findByIdAndUpdate("5e18781ab59b6b4866e2269a", 
{ title: 'Avenger Endgame'},
    // ici j'indique le "title" modifié (avant c'était "Avanger Endgame")
 (error, post) => {
    console.log(error, post);
    
})
// ici "post" en argument car on fait une MAJ donc on va reposter
// ici on demande de trouver l'objet lié à l'ID puis de le mettre le à jour // "error" : s'il y a une erreur tu me l'affiche et sinon tu poste la MAJ "post"


Article.findById("5e187f0b910ee44d595ef4b1", (error, articles) => {
    console.log(error, articles);
    
})
// ici on recherche directement l'objet par l'ID
// () => { remplace function(){ (c'est une fonction fléchée)
// en argument : "error" : s'il y a une erreur tu me l'affiche / "articles" : recherche dans la collection "articles" et affiche


Article.find({

    title: 'Spiderman',
//     si tu vois un "title" avec "spiderman" tu m'affiche l'objet 
//      (ici on affiche {
//     _id: 5e187f0b910ee44d595ef4b1,
//     title: 'Spiderman',
//     intro: "Test d'introduction",
//     content: 'Critique sur le film Spiderman',
//     __v: 0
//   })

}, (error, articles) => {
// () => { remplace function(){ (c'est une fonction fléchée)
    console.log(error, articles);
})
// méthode "find" : on demande d'afficher le contenu de notre BDD
// en argument : "error" : s'il y a une erreur tu me l'affiche / "articles" : toruve la collection "articles" et affiche la



Article.create({
// "Article" étant le modèle créé dans "Article.js" pour lequel on a réaliser un "module.exports"
// la méthode "create" permet d'ajouter du contenu dans le shéma de ce fichier


    title: "Spiderman",
    intro: "Test d'introduction",
    content: "Critique sur le film Spiderman",
// on écrit de manière à ce que cela respecte le schéma (cf "Article.js")
}, (error, post) => {
// (error, post) => { remplace function(error, post){ (c'est une fonction fléchée)
    console.log(error, post);
    
}

)
// en gros on créé une collection "Article" dans la base de donnée "blog-test" qui contient l'objet rempli
// => "Article" se transforme en "articles" dans la bdd c'est normal
