"use strict";

const express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),
  router = require("./routes/index"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  passport = require("passport"),
  cookieParser = require("cookie-parser"),
  expressSession = require("express-session"),
  expressValidator = require("express-validator"),
  connectFlash = require("connect-flash"),
  User = require("./models/user");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/eng_helper",
  { useNewUrlParser: true, useFindAndModify: false }
);
mongoose.set("useCreateIndex", true);

// 환경변수에 PORT값 또는 3000번 포트를 이용
app.set("port", process.env.PORT || 3000);
// 렌더링에 사용할 모듈을 지정
app.set("view engine", "ejs");

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

app.use(morgan("combined"));
app.use(layouts);
app.use(express.static("public"));  //public 폴더가 static 폴더다
app.use(expressValidator());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.use(cookieParser("engHelper123"));
app.use(
  expressSession({
    secret: "engHelper123",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);
app.use(connectFlash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

// 세션에 저장하는 serialize 
passport.serializeUser(User.serializeUser());
// serialize를 통해 받은 유저의 id를 이용해 이용자를 식별
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

app.use("/", router);

//papago 번역부분
//미완성
var client_id = 'ksm28LQB1Sj9c0SL5Tyi';
var client_secret = 'D0qu1xl1qR';
var query = "번역할 문장을 입력하세요. ";
app.get('/translate', function (req, res) {
  var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
  var request = require('request');
  var options = {
    url: api_url,
    form: {'source':'ko', 'target':'en', 'text':query},
    headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
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


const server = app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  }),
  io = require("socket.io")(server),
  chatController = require("./controllers/chatController")(io);
