//Importing dependencies
var http = require('http');
var urlencode = require('urlencode');
var request=require('request');
var http = require("https");
const dotenv=require("dotenv");
dotenv.config();
const{HASH_TEXTLOCAL}=require('../../env');
require('../db/sql');
const Sms_table=require('../models/messages');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
localStorage.clear()

async function sendsms (toNumber,from,msg,method,sender_id,customer_id){
    var data=msg;
    var toNumber;
    var msg;
    var username = urlencode('info.oyesters@gmail.com');
    var hash =HASH_TEXTLOCAL; // The hash key could be found under Help->All Documentation->Your hash key. Alternatively you can use your Textlocal password in plain text.
    var sender = from;
    var data = 'username=' + username + '&hash=' + hash + '&sender=' + sender + '&numbers=' + toNumber + '&message=' + data;
    var options = {
        host: 'api.textlocal.in', path: '/send?' + data
    };
    callback = function (response) {
        var str = '';//another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });//the whole response has been recieved, so we just print it out here
        response.on('end', async () => {
            var content=JSON.parse(str)
            //Message send
            if(content.status=="success"){
                const user=await Sms_table.create({
                    customer_id:customer_id,
                    send_sms_to:toNumber,
                    send_sms_body:msg,
                    send_sms_service_name:method,
                    send_sms_confimation:1,
                    send_sms_error:"No error",
                    createdBy:sender_id
                });
            }else{
                //Error in sending message
                const user=await Sms_table.create({
                    customer_id:customer_id,
                    send_sms_to:toNumber,
                    send_sms_body:msg,
                    send_sms_service_name:method,
                    send_sms_confimation:0,
                    send_sms_error:content.errors[0].message,
                    createdBy:sender_id
                });
            }
        });
    }
    http.request(options, callback).end();//url encode instalation need to use $ npm install urlencode    
}

module.exports = sendsms;