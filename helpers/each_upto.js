module.exports = {
    each_upto : function(ary, max, options) {
        if(!ary || ary.length == 0)
            return options.inverse(this);
    
        var result = [ ];
        for(var i = 0; i < max && i < ary.length; ++i)
            result.push(options.fn(ary[i]));
        return result.join('');
    }
}

// fonction permettant de filtrer le nb d'article présent sur la page d'accueil
// "each_upto" est le nom que l'on donne à notre fonction : on l'appel dans app.js
// j'utilise ensuite ma variable/mon paramètre "each_upto" dans "index.handlebars"
// "ary" est le paramètre array, "max" le paramètre nb maxi à afficher /
// https://stackoverflow.com/questions/10377700/limit-results-of-each-in-handlebars-js

// au départ : juste mis le code dans app.js