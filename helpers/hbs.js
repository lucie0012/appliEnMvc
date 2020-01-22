module.exports = {
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/g, ' ').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/&eacute;/g, 'é').replace(/&acirc;/g, 'â').replace(/&agrave;/g, 'à').replace(/&egrave;/g, 'è').replace(/&amp;/g, '*').replace(/&quot;/g, '"');
    }
    // "stripTags" est le nom que l'on donne à notre fonction
    // "input" est le paramètre
    // utilisé sur "articles.handlebars"
}