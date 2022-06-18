var express = require('express');
var app = express();
var client_id = 'ksm28LQB1Sj9c0SL5Tyi';
var client_secret = 'D0qu1xl1qR';
var query = "번역할 문장을 입력하세요. 뭐라고 번역할까";
app.get('/translate', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
   var request = require('request');
   var options = {
       url: api_url,
       form: {'source':'ko', 'target':'en', 'text':query},
       headers: {'X-Naver-Client-Id':ksm28LQB1Sj9c0SL5Tyi, 'X-Naver-Client-Secret': D0qu1xl1qR}
    };
   request.post(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });
 app.listen(3000, function () {
   console.log('http://127.0.0.1:3000/translate app listening on port 3000!');
 });