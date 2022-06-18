"use strict";

const router = require("express").Router(),
  sentencesController = require("../controllers/sentencesController");

router.get("", sentencesController.index, sentencesController.indexView);
router.get("/new", sentencesController.new);
router.post("/create", sentencesController.create, sentencesController.redirectView);
router.get("/:id/edit", sentencesController.edit);
router.put("/:id/update", sentencesController.update, sentencesController.redirectView);
router.get("/:id", sentencesController.show, sentencesController.showView);
router.delete("/:id/delete", sentencesController.delete, sentencesController.redirectView);
router.post('/translate',sentencesController.translate);

module.exports = router;
