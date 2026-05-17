const Candidate = require("../models/Candidate");


// ADD CANDIDATE
const addCandidate = async (req, res) => {
  try {
    const { name, email, skills, experience, bio } = req.body;

    const candidate = new Candidate({
      name,
      email,
      skills,
      experience,
      bio,
    });

    await candidate.save();

    res.status(201).json({
      success: true,
      message: "Candidate added successfully",
      candidate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL CANDIDATES
const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();

    res.status(200).json({
      success: true,
      count: candidates.length,
      candidates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addCandidate,
  getCandidates,
};