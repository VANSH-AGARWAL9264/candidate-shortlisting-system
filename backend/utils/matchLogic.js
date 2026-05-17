const matchCandidates = (candidates, jobRequirements) => {
  const { requiredSkills, minExperience } = jobRequirements;

  const matchedCandidates = candidates.map((candidate) => {

    // MATCHED SKILLS
    const matchedSkills = candidate.skills.filter((skill) =>
      requiredSkills.includes(skill)
    );

    // MATCH SCORE
    const matchScore =
      (matchedSkills.length / requiredSkills.length) * 100;

    // EXPERIENCE CHECK
    const experienceMatch =
      candidate.experience >= minExperience;

    return {
      ...candidate._doc,

      matchedSkills,

      matchScore: matchScore.toFixed(2),

      experienceMatch,

      ranking:
        matchScore >= 80
          ? "High Match"
          : matchScore >= 50
          ? "Medium Match"
          : "Low Match",
    };
  });

  // SORT DESCENDING
  matchedCandidates.sort(
    (a, b) => b.matchScore - a.matchScore
  );

  return matchedCandidates;
};

module.exports = matchCandidates;