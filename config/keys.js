module.exports = {
    MongoURI : process.env.MONGO_URI,
    // url cloud mongodb avec mongoDb.Atlas (cf doc github)

}
    // dans "heroku" dans le projet, dans settings, dans Config Vars : reveal config vars : mettre son nom et coller l'url cloud mongodb avec mongoDb.Atlas ('mongodb+srv://lucie:eodeezae250812@cluster0-xyvlf.mongodb.net/test?retryWrites=true&w=majority')
    // puis à la place de l'url mettre "process.env.nomdonnédansconfigvars"
    // permet que la clé ne soit pas présente dans le code (sécurité)