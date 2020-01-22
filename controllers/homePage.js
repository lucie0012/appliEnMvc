const Post = require("../database/models/Article");
// création de la variable "Post" qui va récupérer notre model qui est dans le dossier database


module.exports = async (req, res) => {
    // la requête va se synchroniser avec une BDD en méthode asynchrone (peut gérer plusieurs requêtes en même temps)
    const posts = await (await Post.find({})).reverse()
    // on créé une variable qui permet d'attendre le retour de la requête ("await") puis affiche le contenu qu'il y a dans la BDD sous forme d'objet ("Post" étant la variable créée plus haut qui fait référence au model)
    // "reverse" permet inverse l'ordre des élements d'un tableau (ici le plus récent devient le 1er)
    // "slice(x, y)" permet de ne séléctionner et affiche que de l'élement x à y du tableau (autre solution pour filtrer le nb d'article à afficher sur la page d'accueil)
        // const posts = await (await Post.find({})).reverse().slice(0, 2)

    // console.log(req.session);


    res.render("index", { posts }
        // on veut qu'il nous affiche l'url de "index" (fait référence au doc index.handlebars se situant dans le dossier views (structure demandée par handlebars))
        // on veut également qu'il affiche le resultats de la variable "posts"

        //     res.send("Coucou");
        // // // elle nous enverra le message "coucou" sur la page
        //     const salutation = "Bonjour les amis";
        //     res.render({ hello: salutation })
        //     // on veut qu'il affiche "Bonjour les amis" (créé via la variable "salutation") donc on créé une "variable" "hello" qui correspond à "salutations"
        //     // cette "variable" là sera ensuite appelée dans le fichier "index.handlebars" via "hello"

    )


    
}

// bout de code qu'on exporte pour pouvoir le récupérer (require) dans notre "app.js"