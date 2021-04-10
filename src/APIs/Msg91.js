// var http = require("https");

// var options = {
//   "method": "POST",
//   "hostname": "",
//   "port": null,
//   "path": "/api/v5/flow/",
//   "headers": {
//     "authkey": "",
//     "content-type": "application/JSON"
//   }
// };

// var req = http.request(options, function (res) {
//   var chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function () {
//     var body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });

// req.write("{\"flow_id\":\"EnterflowID\",\"sender\":\"EnterSenderID\",\"mobiles\":\"Enter Mobile Number\",\"VAR1\":\"VALUE1\",\"VAR2\":\"VALUE2\"}");
// req.end();