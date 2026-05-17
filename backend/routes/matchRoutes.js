const express = require("express");

const {
  shortlistCandidates,
} = require("../controllers/matchController");

const router = express.Router();


// MATCH CANDIDATES
router.post("/", shortlistCandidates);

module.exports = router;