const bcrypt = require('bcrypt');
// on récupère dépendance "bcrypt"
const User = require('../database/models/User')
// on récupère notre modèle


// module de connexion
module.exports = (req, res) => {

    const { email, password } = req.body;
    // écriture en decomposition (destructuring) : veut dire pareil que : "const email, password = req.body.email, req.body.password"
    // via "email et password" je récupère les données du name "email et password" (cf login.handlebars)

    User.findOne({ email }, (error, user) => {
    // on cherche dans la BDD (User est la BDD) l'email
        if (user) {
        // puis il compare à l'utilisateur (si il trouve l'email)
            bcrypt.compare(password, user.password, (error, same) => {
                // on compare le cryptage du password récupéré à un password utilisateur dans la BDD
                if (same) {
                    // si c'est pareil (si email et mdp sont identique)

                    req.session.userId = user._id
                    // lors de la connexion, un cookie sera créé (grâce à express-session) (dans inspecter, application, cookies puis dans value)
                    // on demande de remplacer l'ID de base du cookie par l'id de l'utilisateur (renseigné dans la BDD)

                    res.redirect('/')
                    // tu redirige sur la page d'accueil
                } else {
                    res.redirect('/user/login')
                    // tu restes où tu es (c'est l'URL de la page loginAuth)
                }
            })
        } else {
            return res.redirect('/user/login')
            // sinon (si l'email n'est pas dans la BDD) tu restes où tu es (c'est l'URL de la page loginAuth)
        }

    })
    // on compare avec la BDD

}