module.exports = (req, res, next) => {
    // () => {} fonction fléchée
    // un middleware est une fonction
        if(!req.files) {
        // si tu trouves pas de fichier
            return res.redirect('/')
            // tu redirige vers la page d'accueil
        }
        console.log("je suis le Middleware");
        // on demande d'afficher 
        next()
        // indique qu'ensuite il "fait ce qui va suivre" : très important car sinon le chargement se bloque
        
    }