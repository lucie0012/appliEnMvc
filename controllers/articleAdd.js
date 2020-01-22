module.exports = (req, res) => {   
    
    if(req.session.userId){
    // si la session à un ID alors
    // "req.session" est l'objet de la session et "userId" sa propriété
        return res.render("article/add")
        // tu peux afficher la page
    }

    res.redirect('/user/login')
    
}
// bout de code qui renvoi la page "add.handlebars" (contenu dans le dossier articles) (enfin son body)
// on l'exporte pour pouvoir le récupérer (require) dans notre "app.js"


