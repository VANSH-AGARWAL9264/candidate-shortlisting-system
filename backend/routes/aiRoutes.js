const express = require("express");

const {
  aiShortlistCandidates,
} = require("../controllers/aiController");

const router = express.Router();


// AI SHORTLIST ROUTE
router.post("/shortlist", aiShortlistCandidates);

module.exports = router;