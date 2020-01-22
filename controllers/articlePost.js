const path = require('path');
// on récupère le paquet 'path' (déjà présent dans les dépendances) afin de l'utiliser plus bas via "path.resolve"

const Post = require("../database/models/Article");
// création de la variable "Post" qui va récupérer notre model qui est dans le dossier database


module.exports = (req, res) => {
    // () => {} fonction fléchée

    // console.log(req.files);
    // // quand on va uploader, affiche sur la console les infos du fichier (permet de véirifer si la récupération fonctionne)

    const { image } = req.files
    // écriture en decomposition (destructuring) : veut dire pareil que : "const image = req.files.image"
    // via "image" je récupère les données du name "image" cad le fichier (cf add.handlebars)

    const uploadFile = path.resolve(__dirname, '..', 'public/articles', image.name);
    // ici je donne le chemin où sera stockée l'image
    // "path.resolve" : est la syntaxe pour indiquer le chemin
    // ici le chemin est : "__dirname" : qui est le répertoire dans lequel réside le script en cours d’exécution (celui à partir duquel on lance node) 
    // auquel on concatène '..' (qui indique qu'il faudra sortir du répertoire où il est)
    // auquel on concatène "public/articles" puis le nom de l'image qu'on récupère : ce qui nous donnera le chemin final

    image.mv(uploadFile, (error) => {
    // la méthode "mv" va permettre de déplacer l'image dans l'url créé via "uploadFile"
    // s'il y a une erreur il l'affiche puis tu exécute la fonction qui est la requête
        
        // quand on va demander cette requête post ("app.post" de la page articles)
        Post.create(
        // on va crééer dans la BDD une nvlle publication "Post" selon le modèle réalisé (cf Article.js dans dossier models)
            {
                ...req.body,
                image: `/articles/${image.name}`
                // pas besoin de mettre /public devant car on a déjà paramétrer plus haut que les fichiers statiques on pour racine "public"
                // "${image.name}" permet d'y ajouter le nom de l'image (on appel une variable via $)
            }
            , (error, post) => {
                res.redirect("/")
                // puis je le redirige sur une autre page : ici page d'accueil
            })
        
        // console.log(req.files);

        // console.log(req.body.image);


    })

    // Post.create(req.body, (error, post) => {
    //     // ça ajoutera les données récupérées dans notre BDD en suivant le model défini
    //     // s'il y a une erreur tu me le dis sinon tu poste



}

