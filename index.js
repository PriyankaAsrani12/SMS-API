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


//Swagger definition
/**
 * @swagger
 * /sms/{code}:
 *  get:
 *      description: Various sms APIs
 *      tags:
 *      - Sms
 *      parameters:
 *      - name: code
 *        in: path
 *        description: JWT code
 *        required: true
 *        type: string
 *        example: twilio-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0byI6Iis5MTc4NzUxOTIzNTgiLCJmcm9tIjoiKzE2NjcyMTM2NDEwIiwic2VuZGVyX25hbWUiOiJveWVzdGVyc190cmFpbmluZyIsImJvZHkiOiJUaGlzIGlzIHRyaWFsIGJvZHkiLCJtZXRob2QiOiJ0d2lsaW8iLCJzZW5kZXJfaWQiOjIsImN1c3RvbWVyX2lkIjoyfQ.XHA1nV6YR4ati_U7glgvQ5Ree9UID0mxvfYqc7JQGSQ
 *                 textlocal-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0byI6Iis5MTg3NjY1MTY1MjAiLCJmcm9tIjoiT1lFU1RSIiwiYm9keSI6IkRlYXIlMjBBdHRlbmRlZSUyQyUwQVdlJTIwaGF2ZSUyMHJlY2VpdmVkJTIwcGF5bWVudCUyMG9mJTIwUnMlMjAxJTIwYWdhaW5zdCUyMHlvdXIlMjBwdXJjaGFzZSUyMG9mJTIwMSUyMHNlYXQlMjBmb3IlMjBUZXh0TG9jYWwuJTBBVGhhbmslMjB5b3UlMjBmb3IlMjByZWdpc3RlcmluZyUyMSUyMEZ1cnRoZXIlMjBkZXRhaWxzJTIwd2lsbCUyMGJlJTIwY29udmV5ZWQlMjB0byUyMHlvdSUyMHZpYSUyMEVtYWlsJTIwYW5kJTIwU01TJTIwMSUyMGRheSUyMHByaW9yJTIwdG8lMjB0aGUlMjB3ZWJpbmFyLiUwQVJlZ2FyZHMlMkMlMEFPeWVzdGVycyUyMFRyYWluaW5nIiwibWV0aG9kIjoidGV4dGxvY2FsIiwic2VuZGVyX2lkIjoxMjMsImN1c3RvbWVyX2lkIjoxMjN9.5B7GaWrbMPhuYHKBD4XmgNfq93Y8PAY3MbvHR4VtQ-s
 *      responses:
 *         '200':
 *              description: Successfully sent sms
 */
//Using routes
app.use('/', routes)

//Starting
app.listen(5050,()=>{
    console.log("Server Started");
});