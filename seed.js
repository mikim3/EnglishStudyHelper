"use strict";

const mongoose = require("mongoose"),
  Course = require("./models/course");
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/eng_helper",
  { useNewUrlParser: true, useFindAndModify: false }
);
//다 없애고 나서 다음 문장 실행
Course.deleteMany({}).then(() => {     
    return Course.create({
      title: "my sentence",
      description: "Dive into the divine world of sweet and bitter chocolate making.",
      cost: 12,
      sentenceK: "안녕하세요",
      sentenceE: "hello",
      maxStudents: 14
    });
  }).then(course => console.log(course.title)).then(() => {
    return Course.create({
      title: "Pasta Boat",
      description: "Swim through original recipes and paddle your way through linguine",
      cost: 43,
      maxStudents: 8
    });
  }).then(course => console.log(course.title)).then(() => {
    return Course.create({
      title: "Hot Potato",
      description:
        "Potatoes are back and they are hot! Learn 7 different ways you can make potatoes relevant again.",
      cost: 12,
      maxStudents: 28
    });
  }).then(course => console.log(course.title)).catch(error => console.log(error.message)).then(() => {
    console.log("DONE");
    mongoose.connection.close();
  });
