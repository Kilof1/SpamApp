const express = require('express');
const cors = require('cors');
const errorHandler = require('../middleware/errorHandler');

const authReducer = require('../routes/auth');
const usersReducer = require('../routes/users');


// Handle async errors in request pipeline
require('express-async-errors')

const startupRoutes = function (app) {
    app.use(cors())
    app.use(express.json())

    app.use('/auth', authReducer)
    app.use('/users', usersReducer)

    // error handling middleware in request pipeline
    app.use(errorHandler)
}

module.exports = startupRoutes;