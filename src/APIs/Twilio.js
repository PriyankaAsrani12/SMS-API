//Importing dependencies
const{ACCOUNT_SID_TWILIO,AUTH_TOKEN_TWILIO}=require('../../env');
const accountSid = ACCOUNT_SID_TWILIO;
const authToken = AUTH_TOKEN_TWILIO;
const client = require('twilio')(accountSid, authToken);
require('../db/sql');
const Sms_table=require('../models/messages');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
localStorage.clear()


const sendSms=(to,from,body,method,sender_id,customer_id)=>{
client.messages
    .create({
        body: body,
        from: from,
        to: to
    })
    .then(async(message) =>{
        //Message send
        const user=await Sms_table.create({
            customer_id:customer_id,
            send_sms_to:to,
            send_sms_body:body,
            send_sms_service_name:method,
            send_sms_confimation:1,
            send_sms_error:"No error",
            createdBy:sender_id
        });  
        console.log("No")
    })
    .catch(async(error)=>{
        //Error in sending message
        const user=await Sms_table.create({
            customer_id:customer_id,
            send_sms_to:to,
            send_sms_body:body,
            send_sms_service_name:method,
            send_sms_confimation:0,
            send_sms_error:error.message,
            createdBy:sender_id
        });
        localStorage.setItem("result","error")
        console.log(error)
    })
}

module.exports=sendSms;