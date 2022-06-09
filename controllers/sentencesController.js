"use strict";

const Sentence = require("../models/sentence"),
  httpStatus = require("http-status-codes"),
  User = require("../models/user"),
  getSentenceParams = body => {
    return {
      sentenceK: body.sentenceK,
      sentenceE: body.sentenceE
    };
  };

module.exports = {
  index: (req, res, next) => {
    Sentence.find()
      .then(sentences => {
        res.locals.sentences = sentences;
        next();
      })
      .catch(error => {
        console.log(`Error fetching sentences: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("sentences/index");
  },

  new: (req, res) => {
    res.render("sentences/new");
  },

  create: (req, res, next) => {
    let sentenceParams = getSentenceParams(req.body);
    Sentence.create(sentenceParams)
      .then(sentence => {
        res.locals.redirect = "/sentences";
        res.locals.sentence = sentence;
        next();
      })
      .catch(error => {
        console.log(`Error saving sentence: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let sentenceId = req.params.id;
    Sentence.findById(sentenceId)
      .then(sentence => {
        res.locals.sentence = sentence;
        next();
      })
      .catch(error => {
        console.log(`Error fetching sentence by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("sentences/show");
  },

  edit: (req, res, next) => {
    let sentenceId = req.params.id;
    Sentence.findById(sentenceId)
      .then(sentence => {
        res.render("sentences/edit", {
          sentence: sentence
        });
      })
      .catch(error => {
        console.log(`Error fetching sentence by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let sentenceId = req.params.id,
      sentenceParams = getSentenceParams(req.body);

    Sentence.findByIdAndUpdate(sentenceId, {
      $set: sentenceParams
    })
      .then(sentence => {
        res.locals.redirect = `/sentences/${sentenceId}`;
        res.locals.sentence = sentence;
        next();
      })
      .catch(error => {
        console.log(`Error updating sentence by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let sentenceId = req.params.id;
    Sentence.findByIdAndRemove(sentenceId)
      .then(() => {
        res.locals.redirect = "/sentences";
        next();
      })
      .catch(error => {
        console.log(`Error deleting sentence by ID: ${error.message}`);
        next();
      });
  },
  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals
    });
  },
  errorJSON: (error, req, res, next) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.OK,
        message: "Unknown Error."
      };
    }
    res.json(errorObject);
  },
  filterUserSentences: (req, res, next) => {
    let currentUser = res.locals.currentUser;
    if (currentUser) {
      let mappedSentences = res.locals.sentences.map(sentence => {
        let userJoined = currentUser.sentences.some(userSentence => {
          return userSentence.equals(sentence._id);
        });
        return Object.assign(sentence.toObject(), { joined: userJoined });
      });
      res.locals.sentences = mappedSentences;
      next();
    } else {
      next();
    }
  },
  join: (req, res, next) => {
    let sentenceId = req.params.id,
      currentUser = req.user;
    if (currentUser) {
      User.findByIdAndUpdate(currentUser, {
        $addToSet: {
          sentences: sentenceId
        }
      })
        .then(() => {
          res.locals.success = true;
          next();
        })
        .catch(error => {
          next(error);
        });
    } else {
      next(new Error("User must log in."));
    }
  }
};
