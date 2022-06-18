"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        trim: true
      },
      last: {
        type: String,
        trim: true
      }
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});

// userSchema.pre("save", function(next) {
//   let user = this;
//   if (user.subscribedAccount === undefined) {
//     Subscriber.findOne({
//       email: user.email
//     })
//       .then(subscriber => {
//         user.subscribedAccount = subscriber;  // 사용자가 생성될 때 마다 구독자 계정과 연결 
//         next();
//       })
//       .catch(error => {
//         console.log(`Error in connecting subscriber: ${error.message}`);
//         next(error);
//       });
//   } else {
//     next();
//   }
// });

// passportLocalMongoose 적용함
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);
