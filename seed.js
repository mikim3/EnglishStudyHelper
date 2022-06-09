"use strict";

const mongoose = require("mongoose"),
  Course = require("./models/course"),
  Sentence = require("./models/sentence");
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/eng_helper",
  { useNewUrlParser: true, useFindAndModify: false }
);
//다 없애고 나서 다음 문장 실행
Sentence.deleteMany({}).then(() => {     
  return Sentence.create({
    sentenceK: "안녕하세요",
    sentenceE: "hello",
  });
}).then(sentence => console.log(sentence.sentenceK)).then(() => {
  return Sentence.create({
    sentenceK: "반가워요",
    sentenceE: "I'm glad to see you.",
  });
}).then(sentence => console.log(sentence.sentenceK)).then(() => {
  return Sentence.create({
    sentenceK: "오늘은 발표하는 날이에요",
    sentenceE: "Today is an announcement day",
  });
}).then(sentence => console.log(sentence.sentenceK)).catch(error => console.log(error.message)).then(() => {
  console.log("DONE");
  mongoose.connection.close();
});

