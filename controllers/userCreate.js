module.exports = (req, res) => {
    


    res.render("register", {
    // renvoi à "register.handlebars" car on demande d'afficher son body (on gère tout l'affichage sur cette page)

        errors : req.flash('registerError'),
        // s'il y a une erreur tu l'affiches (ici tu affiches l'erreur lié à l'inscription : cf 'req.flash' dans "userRegister.js")
        // car les erreurs s'affiche sur cette page

        data : req.flash('data')[0],
        // "req.flash('data')" étant un objet dans un tableau alors on précise [0] afin d'obtenir le 1er élement (le seul)
    })
}