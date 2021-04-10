//Importing dependencies
const express=require("express");
const app=express();
const decodingJWT=require('../JWT/decoding');
const TextlocalSendSms = require("../APIs/Textlocal");
const Msg91SendSms = require("../APIs/Msg91");
const TwilioSendSms = require("../APIs/Twilio");

//Defining variables
params=undefined;
err_key="";

//Swagger definition
/**
 * @swagger
 * /sms:
 *  get:
 *      description: Various sms APIs
 *      tags:
 *      - Sms
 *      responses:
 *         '200':
 *              description: Successfully sent sms
 */

//Routes
app.get("/sms/:code",(req,res)=>{
    code=req.params.code;
    params=decodingJWT(code);

    if(params!=null){
        id_check=false;
        if(typeof(params.sender_id)=="number" && typeof(params.customer_id)=="number"){
            id_check=true;
        }
    }

    if(params!=null && id_check!=false){
        if(params.method=="twilio"){
            res.redirect("/sms/api/twilio"); 
            res.end();
        }
        else if(params.method=="msg91"){
            res.redirect("/sms/api/msg91");
            res.end();
        }
        else if(params.method=="textlocal"){
            res.redirect("/sms/api/textlocal");
            res.end();
        }
        else{
            res.send("Method is wrong!");
        }
    }
    else{
        res.send("Check your details")
    }
});

app.get("/sms/api/twilio",(req,res)=>{
    if(params==undefined || params.to==null || params.from==null){
        res.send("Go to sms page")
        res.end();
    }else{
        TwilioSendSms(params.to,params.from,params.body,params.method,params.sender_id,params.customer_id)
        myresult=localStorage.getItem("result")
        localStorage.clear()
        if(myresult=="error"){
            res.send("Error")
        }else{
            res.send(params)
        }
        params={};
    }
});
app.get("/sms/api/msg91",(req,res)=>{
    if(params==undefined || params.to==null || params.from==null){
        res.send("Go to sms page")
        res.end();
    }else{
        Msg91SendSms(params.to,params.from,params.sender_name,params.subject,params.body,params.sender_id,params.customer_id);
        myresult=localStorage.getItem("result")
        if(myresult=="error"){
            res.send("Error")
        }else{
            res.send(params)
        }
        localStorage.clear()
        params={};
    }
});
app.get("/sms/api/textlocal",(req,res)=>{
    if(params==undefined || params.to==null || params.from==null){
        res.send("Go to sms page")
        res.end();
    }else{
        TextlocalSendSms(params.to,params.from,params.body,params.method,params.sender_id,params.customer_id)
        myresult=localStorage.getItem("result")
       
        if(myresult=="error"){
            res.send("Error")
        }else{
            res.send(params)
        }
        localStorage.clear()
        params={};
    }
});

module.exports=app;