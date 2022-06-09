"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;

var subscriberSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course"
      }
    ]
  },
  {
    timestamps: true
  }
);

subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email}`;
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
