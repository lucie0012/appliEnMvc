module.exports = (req, res) => {
    req.session.destroy(()=> {
    // si tu trouves une session tu la détruit
        res.redirect('/')
        // puis tu redirige vers la page d'accueil
    })
    
}