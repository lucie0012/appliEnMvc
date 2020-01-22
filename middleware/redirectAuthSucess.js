const User = require('../database/models/User');

module.exports = (req, res, next) => {

    if(req.session.userId) {
        // la session à un ID alors
        return res.redirect('/articles/add')
        // on redirige vers la page ajouter un article
    }

    next()
    // sinon tu continues ton chemin
    
}