const Post = require("../database/models/Article");
// création de la variable "Post" qui va récupérer notre model qui est dans le dossier database


module.exports = async (req, res) => {
    
    if(req.session.userId){
        // si la session à un ID alors
        // "req.session" est l'objet de la session et "userId" sa propriété

        // console.log("VOILA " + req.params.id);

        const articleBdd = await Post.findById(req.params.id)
        // je créé une constante qui récupère les informations dans ma BDD concernant l'id qui est en paramètre dans ma console (cad l'ID de l'url et donc l'ID de l'article)


        // console.log(articleBdd);
        
            
            return res.render("edit", { articleBdd })
            // on renvoi la page lié à afficher : cad la page "edit.handlebars" et les infos de la variable "articleBdd" que je vais utiliser dans la page "edit.handlebars" pour appeler le titre, le contenu et l'auteur dans les cases concernées
        }
    
        res.redirect('/user/login')

        
}


// Article.findByIdAndUpdate("5e18781ab59b6b4866e2269a", 
// { title: 'Avenger Endgame'},
//     // ici j'indique le "title" modifié (avant c'était "Avanger Endgame")
//  (error, post) => {
//     console.log(error, post);
    
// })