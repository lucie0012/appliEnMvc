const mongoose = require('mongoose');
// on récupère notre paquet/dépendance "mongoose" pour l'utiliser
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    // création du shéma pour la bdd "article"

    // dès qu'on veut qu'une donnée puisse être récupérée il faut bien ajouter au modèle son nom et son type

    name: {
        type: String,
        required: [true, "Le nom est obligatoire"],
        // "Le nom est obligatoire" va permettre d'afficher ce message lors de l'erreur et non 'Path `name` is required.'
    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true,
    // ici on précise : le type "chaine de caractère", que c'est requis et quil doit être unique
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est obligatoire"],
    },

})

UserSchema.pre('save', function (next) {
// au moment où l'utilisateur va demander à ce que l'appli fasse quelque chose 
// avant (via "pre") que les données soit stockées sur la BDD
// on demande d'accomplir la fonction

    const user = this
    // this correspond au model "name: String, email: String, password : String,"
    // cette variable permet de récupérer les informations qui seront transmises sur la page
    
    bcrypt.hash(user.password, 10, (error, encrypted) => {
    // puis on demande de crypter via "bcrypt" (attention penser à l'installer)
    // "user.password" ce qu'on crypte (ici le "password" de "user" le model) et "10" le nombre de fois qu'on le "secouera" (technique de cette méthode de cryptage)
    // s'il y a une erreur tu l'affiches sinon tu réalise le cryptage
        user.password = encrypted

        next()
        // puis on lui indique de continuer son chemin
    })

})


module.exports = mongoose.model('User', UserSchema)
// on exporte tout ça via le model "User" afin de pouvoir le récupérer dans différents projets
