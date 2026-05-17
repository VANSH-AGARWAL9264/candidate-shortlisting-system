const Candidate = require("../models/Candidate");

const matchCandidates = require("../utils/matchLogic");


const shortlistCandidates = async (req, res) => {
  try {

    const { requiredSkills, minExperience } = req.body;

    // GET ALL CANDIDATES
    const candidates = await Candidate.find();

    // APPLY MATCHING LOGIC
    const matchedResults = matchCandidates(candidates, {
      requiredSkills,
      minExperience,
    });

    res.status(200).json({
      success: true,
      totalCandidates: candidates.length,
      matchedResults,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  shortlistCandidates,
};