const User = require('../database/models/User');

module.exports = (req, res, next) => {

    // Connecte toi dans la BDD
    User.findById(req.session.userId, (error, user) => {
    // on cherche l'id dans l'utilisateur dans notre BDD / s'il y a une erreur on le dit
        if (error || !user) {
        // s'il y a une erreur ou si l'utilisateur n'est pas là
            return res.redirect('/user/login')
            // tu redirige vers la page de login
        }
        next()
        // sinon tu continues le déroulement du code
    })
    

    // Vérifie l'utilisateur



    // Si il est dans la BD



    // Sinon tu le rediriges


}