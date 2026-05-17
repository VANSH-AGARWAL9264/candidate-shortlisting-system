const axios = require("axios");

const Candidate = require("../models/Candidate");


const aiShortlistCandidates = async (req, res) => {

  try {

    const { requiredSkills, minExperience } = req.body;

    // GET ALL CANDIDATES
    const candidates = await Candidate.find();

    // CREATE CANDIDATE TEXT
    const candidateData = candidates
      .map(
        (candidate, index) => `
${index + 1}. ${candidate.name}
Skills: ${candidate.skills.join(", ")}
Experience: ${candidate.experience} years
Bio: ${candidate.bio}
`
      )
      .join("\n");


    // AI PROMPT
    const prompt = `
You are an AI recruitment assistant.

Job Requirements:
Required Skills: ${requiredSkills.join(", ")}
Minimum Experience: ${minExperience} years

Candidates:
${candidateData}

Task:
1. Rank the best candidates.
2. Explain why they are suitable.
3. Mention strengths and weaknesses.
4. Give final recommendation.
`;


    // OPENROUTER API CALL
    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "openai/gpt-4o-mini",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );


    // AI RESPONSE
    const aiResponse =
      response.data.choices[0].message.content;


    res.status(200).json({
      success: true,
      aiRecommendation: aiResponse,
    });

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "AI Shortlisting Failed",
      error: error.message,
    });

  }
};

module.exports = {
  aiShortlistCandidates,
};