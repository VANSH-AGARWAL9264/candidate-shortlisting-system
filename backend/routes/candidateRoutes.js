const express = require("express");

const {
  addCandidate,
  getCandidates,
} = require("../controllers/candidateController");

const router = express.Router();


// ADD CANDIDATE
router.post("/", addCandidate);


// GET ALL CANDIDATES
router.get("/", getCandidates);

module.exports = router;