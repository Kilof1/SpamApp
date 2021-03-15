const express = require('express');
const dotenv = require('dotenv');

const startupDB = require('./startup/database');
const startupRoutes = require('./startup/routes');
const startupSettings = require('./startup/settings');


// Config dotenv
dotenv.config()

// Startup settings
startupSettings()

// Startup database
startupDB()

// Startup routes
const app = express()
startupRoutes(app)

// Run server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
