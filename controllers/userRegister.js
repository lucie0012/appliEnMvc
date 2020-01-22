const User = require('../database/models/User');
// on récupère notre modèle

module.exports = (req, res) => {
    User.create(
    // on créé un nouvel utilisateur ("user") dans la BDD selon le model créé dans User.js dans dossier models (cf variable plus haut)
        req.body, (error, user) => {
        // on récupère les données du body de "register.handlebars"
            
            if (error) {
            // s'il y a une erreur

                const registerError = (Object.keys(error.errors).map(key => error.errors[key].message));
                // nous met les erreurs dans un tableau (via : "(Object.keys(error.errors))"  => donne "[ 'name', 'email', 'password' ]/ 
                // .map(key => error.errors[key].message) : on met les erreurs avec le message correspondant dans une map => donne 
                    // [
                    //   'Path `name` is required.',
                    //   'Path `email` is required.',
                    //   'Path `password` is required.'
                    // ]
                

                req.flash('registerError', registerError)
                // on pourra l'utiliser à n'importe quel moment de notre code avec cette valeur : 'registerError' et il récupérera les infos de la variable 'registerError'
                // ici sur la page "user/create" car c'est là que l'on gère l'affichage

                req.flash('data', req.body)
                // on pourra l'utiliser à n'importe quel moment de notre code avec cette valeur : 'data' et il va récupérer tout ce que l'utilisateur va saisir (via req.body)
                // ici sur la page "user/create" car c'est là que l'on gère l'affichage
                

                return res.redirect("/user/create")
                // tu restes sur la page indiqué
            }
            
            // sinon
            res.redirect('/')
            // quand c'est fini je redirige vers la page d'accueil
        }
    )
}
