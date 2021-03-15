const mongoose = require('mongoose');

const startupDB = function () {

    // Get env variables
    // const MONGO_USER = process.env.MONGO_USER || 'CA-Forum-App'
    // const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'bad-pass'
    // const MONGO_DB = process.env.MONGO_DB || 'CA-SpamApp'

    // Set connection string
    // const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cc-forum.4k1nv.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`

    const uri = 'mongodb://localhost/vidly';

    // Connection options
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
    mongoose.set('useFindAndModify', false)

    // Connect to DB
    mongoose.connect(uri, options)
        .then(() => console.log('Conected to mongoDB'))
        .catch((error) => {
            throw error
        })
}

module.exports = startupDB;