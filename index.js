//Importing dependencies
const express=require("express");
const bodyParser=require("body-parser");
require('./src/db/sql');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const routes=require('./src/routes/routes');

//Importing local storage
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

//Creating instance of express
const app=express();

//Swagger initialization
const swaggerOptions={
    swaggerDefinition:{
        info:{
            title: 'Sms API',
            description: 'Sms API Documentation',
            contact: {
                name: "Priyanka Asrani",
            },
            servers: ["http://localhost:5000"]
        }
    },
    apis: ["index.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Middleware
app.use('/web', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Using routes
app.use('/', routes)

//Starting
app.listen(5050,()=>{
    console.log("Server Started");
});