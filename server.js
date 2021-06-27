// ENVIRONMENTS
require('./utils/dotenvConfig')({is_dev: true})

// EXPRESS
const express = require('express');
const app = new express();

// HTTP
const http = require('http');
const serverHttp = http.createServer(app).listen( 3000 , () => {
    console.log(`protocole: ${process.env.PROTOCOLE} |  port: ${process.env.PORT} | environnement: ${process.env.ENV} | version: ${process.env.VERSION}`)
});

// SESSION
const session = require('express-session');
const sessionOptions = require('./utils/session-options')
app.use(session(sessionOptions));

// PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))

// CORS
const cors = require('cors')
const corsOptions = require('./utils/cors-options')
app.use(cors(corsOptions))

// FILES
app.use(express.static('public'))

// ROUTER
const router = require("./router/router")
app.use("/", router)
