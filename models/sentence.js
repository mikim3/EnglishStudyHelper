"use strict";

const mongoose = require("mongoose")

var sentenceSchema = new mongoose.Schema(
  {
    sentenceK: {
      type: String,
      required: true,
    },
    sentenceE: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Sentence", sentenceSchema);
