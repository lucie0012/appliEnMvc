// Dossier que l'on met sur Github

// INDICATIONS :
// si pas fait : installer node js version 12 (cf word)
// si pas fait télécharger npm version 6.13 (cf word)

// sur le terminal : "npm init" pour démarrer le projet (car c'est un nouveau projet)
// si c'est un projet qu'on récupère alors faire "npm i" (pour npm install) il va automatiquement installer toutes les dépendances présente dans package.json et donc pas besoin d'installer ce qui suit (les dépendances) (sauf nodemon?)

// installation "nodemon" sur le terminal : "npm i nodemon" (avoir après rafrachissement la MAJ et ne pas avoir à fermer et ouvrir)

// si erreur car le port est déjà utilisé : taper en ligne de commande :
// "sudo netstat -lntp" puis "sudo kill 17153" (sachant que 17153 est le PID qui utilise en adresse locale 3000)
// sinon "sudo lsof -i :3000" puis "kill -9 {PID}" (avec 9 le PID)

// installation "express" sur le terminal : "npm i express" (cf doc npm (site?))

// installation d'un moteur de templating (permet d'afficher une variable) : ici : "handlebars" : "npm install express-handlebars" (cf doc npm express-handlebars (site?))

// créer la structure de notre dossier afin de faire correspondre à notre code:
// ├── app.js
// └── views (dossier)
//          ├── home.handlebars
//          └── layouts (dossier)
//              └── main.handlebars

// créer un dossier "public" et y mettre le dossier "resources" contenant le dossier "css" et le dossier "images" et également y mettre le "style.css"
// car il faut y regrouper tout les fichiers statique afin de paramétrer plus tard sa lecture par express (cf plus bas)

// installer mongoDb (la BDD): https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/ et doc word / lancer mongodb sur un terminal à part : "sudo mongod" (Pour utiliser mongodb : sur un autre terminal : « sudo mongo »)
// installer robo3t (interface graphique pour utiliser mongoDb) : https://www.techrunnr.com/install-robomongo-robo-3t-on-ubuntu-18-04/ et doc word
// installer mongoose (pour permettre à nodeJs de communiquer avec mongoDb) : sur le terminal de commande de VSC : « npm i --save mongoose » 

// installer "body-parser" : "npm install body-parser"

// installer handlebars.moment pour obtenir le bon format de date : "npm i handlebars.moment" / https://www.npmjs.com/package/handlebars.moment

// installer "express fileupload" pour envoyer un fichier sur le serveur : "npm i express-fileupload" / https://www.npmjs.com/package/express-fileupload

// installer "bcrypt" pour crypter un mot de passe : "npm i bcrypt"

// installer "express-session" pour gérer les sessions (cookies de sessions) : "npm i express-session" /  https://www.npmjs.com/package/express-session

// installer "connect-mongo" : pour connecter la BDD avec le systeme de session : "npm i connect-mongo" / https://www.npmjs.com/package/connect-mongo

// installer "connect-flash" : faire afficher nos messages d'erreur de façon semi-permanente (dépend des sessions et des cookies) : "npm i connect-flash" /  https://www.npmjs.com/package/connect-flash

// aller sur la doc et sur getting starter sur ckeditor.com et copier le "script" et le coller dans "main.handlebars" pour pouvoir l'utiliser
// puis aller sur le site dans "how to use" car il y a également une ligne de code "script" à mettre dans "add.handlebars"

// installer handlebars-helpers :  : "npm install --save handlebars-helpers" / https://github.com/helpers/handlebars-helpers#filter

// PENSER à toujours appeler via une "const" et "require" le paquet/dépendance téléchargé
// il faut l'appeler dans le fichier où on l'utilise


// POUR LANCER LE PROJET : démarrer mongod : "sudo systemctl start mongod" et le lancer "mongod"
// Lancer le projet "nodemon app.js"
// Visualiser le projet : taper dans le naviguateur : "localhost:3000" (si port 3000 utilisé)


// le dossier views est le dossier par défaut dans express (raison pour laquelle on ne spécifie par son chemin lors de l'appel des dossiers)


// CODE 

const express = require('express');
// on va chercher notre paquet/dépendance "express" pour pouvoir l'utiliser
const exphbs = require('express-handlebars');
// on récupère notre paquet/dépendance "express-handlebars" pour l'utiliser
const mongoose = require('mongoose');
// on récupère notre paquet/dépendance "mongoose" pour l'utiliser
const bodyParser = require('body-parser');
// on récupère notre paquet/dépendance "body-parser" pour l'utiliser
const fileupload = require('express-fileupload');
// on récupère notre paquet/dépendance "express-fileupload" pour l'utiliser
const expressSession = require('express-session');
// on récupère notre paquet "express-session"
const MongoStore = require('connect-mongo');
// on récupère notre paquet "connect-mongo"
const connectFlash = require('connect-flash');
// on récupère notre paquet "connect-flash"

const {stripTags} = require('./helpers/hbs');
// on récupère notre module dans le fichier "hbs.js" / {} car dans "hbs.js" il est entre accolade


// CONTROLLER
// Article

const articleSingleController = require ('./controllers/articleSingle');
// on récupère le code dans le fichier "articleSingle.js" dans dossier controllers et on utilise la variable plus bas pour utiliser ce code
const articleAddController = require('./controllers/articleAdd');
// on récupère le code dans le fichier "createArticle.js" dans dossier controllers et on utilise la variable plus bas pour utiliser ce code
const articlePostController = require('./controllers/articlePost');
const homePage = require('./controllers/homePage');
const userLogout = require('./controllers/userLogout');

const articleEditController = require('./controllers/articleEdit');
// ICI : création variable "articleEditController" qui va chercher mon fichier js concerné

// User

const userCreate = require('./controllers/userCreate');
const userRegister = require('./controllers/userRegister');
const userLogin = require("./controllers/userLogin");
const userLoginAuth = require("./controllers/userLoginAuth");


const app = express();
// on "l'initialise" et on l'utilisera via "app"

// const urlDb = 'mongodb://localhost:27017/blog';
// url local avec mongodb et robo3t
const urlDb = 'mongodb+srv://lucie:eodeezae250812@cluster0-xyvlf.mongodb.net/test?retryWrites=true&w=majority';
// url cloud mongodb avec mongoDb.Atlas (cf doc github)

mongoose.connect(urlDb, {useUnifiedTopology: true, useNewUrlParser: true});
// on se connecte à la BDD / on indique le num du port (localhost) et le nom de la bdd (ici "blog") (elle se crééra automatiquement)
// attention bien penser à lancer la BDD via un autre terminal de commande via "mongod"

const mongoStore = MongoStore(expressSession);
// on connecte le modèle mongostore avec express-session afin qu'il créé une session dans la BDD (on créé une variable "mongoStore" qui utilise celle "MongoStore" que l'on connecte)


app.use(connectFlash())
// on initialise le module "connect-flash"

app.use(expressSession({
    secret: "securite",
    name: "biscuit",
    saveUninitialized: true,
    resave: false,

    store: new mongoStore(
        { mongooseConnection: mongoose.connection }
    )
    // on connecte mongoStore à mongodb (mongoose)
}))
// paramétrage du cookie (cookies de sessions)



app.use(bodyParser.json())
// "body-parser" permet de traiter/d'analyser les informations envoyée en format json
app.use(bodyParser.urlencoded({extended : true}))
// "body-parser" permet de traiter/d'analyser les informations envoyée via le naviguateur (url)

app.use(fileupload())
// permet d'utiliser "fileupload"



var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);
// pour faire fonctionner handlebars.moment (pour l'utiliser) : pour le formatage de la date


const {each_upto} = require('./helpers/each_upto');

// Handlebars.registerHelper('each_upto', function(ary, max, options) {
//     if(!ary || ary.length == 0)
//         return options.inverse(this);

//     var result = [ ];
//     for(var i = 0; i < max && i < ary.length; ++i)
//         result.push(options.fn(ary[i]));
//     return result.join('');
// });
// fonction permettant de filtrer le nb d'article présent sur la page d'accueil
// "Handlebars" fait référence à la variable plus haut / "each_upto" est le nom que l'on donne à notre fonction
// "ary" est le paramètre array, "max" le paramètre nb maxi à afficher /
// https://stackoverflow.com/questions/10377700/limit-results-of-each-in-handlebars-js
// au lieu de ça (au dessus) : j'ai mis dans un fichier "each_upto" dans un dossier "helpers", ma fonction en lui donnant le nom "each_upto"
// dans app.js j'ai créé ma const {each_upto} qui appel ce fichier
// j'ai ensuite configurer mon helpers dans "app.engine"
// j'utilise ensuite ma variable/mon paramètre "each_upto" dans "index.handlebars"


app.use(express.static('public'));
// comme express ne lit pas les fichiers statiques tels que images, fichier CSS, fichier js, etc
// il faut le paramétrer : 
// tout se qui sera dans le dossier "public" sera chargé en static et aura comme chemin de départ "public"

// ROUTE

app.engine('handlebars', exphbs({ 
    helpers : {
        stripTags: stripTags,
        // le 1er strip est le nom donné et le second c'est ma variable
        each_upto: each_upto,
        // le 1er each est le nom donné et le second c'est ma variable
    },
    defaultLayout: 'main' }));
// configuration pour faire fonctionner notre moteur de templating
// on y indique les paramètres "helpers"
// on y indique le layout par defaut ici nommé "main"(handlebars) dans le dossier "layout"

app.set('view engine', 'handlebars');
// "app.set" : définition des paramètres d'application
//  "view engine" : on défini le moteur (de template) qui va être utilisé ici "handlebars" 
// (il ne sera donc plus utile de mettre ".handlebars" à la fin des fichiers que l'on appel dans le code )

app.use('*', (req, res, next) => {
// on applique à toutes les URL/requêtes via *
    res.locals.user = req.session.userId;
    console.log(res.locals.user);
    next()
    
})

// MIDDLEWARE

const articleValidPost = require('./middleware/articleValidPost')
app.use("/articles/post", articleValidPost)
// si tu vois cette requête là (saisi de cette url) alors tu applique cette variable "middleware"

const auth = require('./middleware/auth');
app.use('/articles/add', auth)
// si tu vois cette requête là (saisi de cette url) alors tu applique cette variable "auht" (déclarée plus haut)

const redirectAuthSuccess = require('./middleware/redirectAuthSucess');


app.get ('/', homePage) 
// quand l'utilisateur demandera la page de la racine (via "/") alors on fait appel à la variable "homePage"
// celle-ci appel le code de la page indiquée dans la variable


// ARTICLES

app.get ('/articles/add', auth, articleAddController)
// quand l'utilisateur demandera l'url "/articles/add" alors : on lui renverra la page "add.handlebars" (contenu dans le dossier articles) (enfin son body)
// cela grâce à la variable "createArticleController" qui fait appel (require) au code du fichier "createArticle"
// bien mettre ce code avant car sinon il lira d'abord la fonction avec l'ID et pensera que "add" est un ID car c'est la même syntaxe (articles)

app.get ('/articles/:id', articleSingleController) 
// quand l'utilisateur demandera l'url "/articles" suivi de "/:id" pour faire référence à l'id (que l'on saisi dans l'url) : alors on fait appel à la variable "articleSingleController"
// celle-ci appel le code de la page indiquée dans la variable


app.post ('/articles/post', auth, articleValidPost, articlePostController)
// "app.post" : récupère les données venant de
// l'url indiqué en paramètre qui vient du code de la page concernée (ici add.handlebars) (il faut bien y préciser aussi la méthode utilisée pour récup : POST)
// il faut également y nommer via "name" les zones où l'on récupère les datas (input ou textarea)
// on fait appel à la variable "articlePostController" qui appel le code de la page indiquée dans la variable

app.get('/edit/:id', articleEditController)
// ICI : j'indique que si l'url du naviguateur est ".../edit" alors j'appel la variable "articleEditController" qui renvoi mon fichier .js concerné (qui lui renvoi mon fichier .html)

// app.post('/edit/:id', articleValidPost, articlePostController)

// USERS

app.get ('/user/create', redirectAuthSuccess, userCreate)
// quand on fera le chemin 'user/create' alors on lance "userCreate" qui est la variable créée plus haut qui renvoi à "userCreate.js" qui renvoi à "register.handlebars"

app.post('/user/register', redirectAuthSuccess, userRegister)
// "app.post" : récupère les données venant de
// l'url indiqué en paramètre qui vient du code de la page concernée (ici register.handlebars) (il faut bien y préciser aussi la méthode utilisée pour récup : POST)
// il faut également y nommer via "name" les zones où l'on récupère les datas (input ou textarea)

app.get('/user/login', redirectAuthSuccess, userLogin)
// quand on fera le chemin 'user/login' alors on lance "userLogin" qui est la variable créée plus haut qui renvoi à "userLogin.js" qui renvoi à "login.handlebars"

app.post('/user/loginAuth', redirectAuthSuccess, userLoginAuth)
// "app.post" : récupère les données venant de
// l'url indiqué en paramètre qui vient du code de la page concernée (ici login.handlebars) (il faut bien y préciser aussi la méthode utilisée pour récup : POST)
// il faut également y nommer via "name" les zones où l'on récupère les datas (input ou textarea)

app.get('/user/logout', userLogout)
// quand on fera le chemin 'user/logout' alors on lance "userLogout" qui est la variable créée plus haut qui renvoi à "userLogout.js"

// CONTACT

app.get ('/contact', function (req, res) {
    // quand l'utilisateur demandera la page /contact  
        res.render("contact");
        // on affiche la page "contact.handlebars"
    })


app.use( (req, res) => {
// quand l'utilisateur demande une url qui n'est pas présente avant (code précédent)
    res.render("error404")
    // on affiche la page "error404.handlebars"
})


app.listen(3000, function () {
    console.log("Le serveur tourne sur le port 3000");

})

