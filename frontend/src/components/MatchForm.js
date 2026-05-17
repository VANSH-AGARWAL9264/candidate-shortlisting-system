// import { useState } from "react";
// import API from "../services/api";

// function MatchForm({ setMatchedCandidates }) {

//   const [requiredSkills, setRequiredSkills] =
//     useState("");

//   const [minExperience, setMinExperience] =
//     useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {

//       const response = await API.post("/match", {

//         requiredSkills: requiredSkills
//           .split(",")
//           .map((skill) => skill.trim()),

//         minExperience,
//       });

//       setMatchedCandidates(
//         response.data.matchedResults
//       );

//     } catch (error) {
//       console.log(error);
//       alert("Matching Failed");
//     }
//   };

//   return (
//     <div style={styles.card}>

//       <h2>Match Candidates</h2>

//       <form onSubmit={handleSubmit}>

//         <input
//           type="text"
//           placeholder="Required Skills"
//           value={requiredSkills}
//           onChange={(e) =>
//             setRequiredSkills(e.target.value)
//           }
//           required
//           style={styles.input}
//         />

//         <input
//           type="number"
//           placeholder="Minimum Experience"
//           value={minExperience}
//           onChange={(e) =>
//             setMinExperience(e.target.value)
//           }
//           required
//           style={styles.input}
//         />

//         <button type="submit" style={styles.button}>
//           Match Candidates
//         </button>

//       </form>
//     </div>
//   );
// }

// const styles = {

//   card: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     marginBottom: "20px",
//   },

//   input: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "10px",
//   },

//   button: {
//     padding: "10px 20px",
//     cursor: "pointer",
//   },
// };

// export default MatchForm;




// import React, { useState } from "react";

// const MatchForm = ({ candidates, onMatch }) => {
//   const [skills, setSkills] = useState("");
//   const [minExp, setMinExp] = useState("");

//   const handleMatch = () => {
//     if (!skills.trim() || !minExp) {
//       alert("Enter skills and minimum experience.");
//       return;
//     }
//     const skillList = skills.split(",").map(s => s.trim().toLowerCase());
//     const exp = parseFloat(minExp);
//     const matched = candidates.filter(c => {
//       const candSkills = c.skills?.map(s => s.toLowerCase()) || [];
//       const hasSkills = skillList.some(skill => candSkills.includes(skill));
//       return hasSkills && c.experience >= exp;
//     });
//     onMatch(matched);
//   };

//   return (
//     <div className="card">
//       <div className="card-header accent-emerald">
//         <div className="accent"></div>
//         <h2>Match Candidates</h2>
//       </div>
//       <div className="card-content">
//         <div className="form-group">
//           <label>Required Skills (comma separated)</label>
//           <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, Node.js" />
//         </div>
//         <div className="form-group">
//           <label>Minimum Experience (years)</label>
//           <input type="number" step="0.5" value={minExp} onChange={(e) => setMinExp(e.target.value)} />
//         </div>
//         <button className="btn-emerald" onClick={handleMatch}>Match Candidates</button>
//       </div>
//     </div>
//   );
// };

// export default MatchForm;




import React, { useState } from "react";

const MatchForm = ({
  candidates,
  onMatch,
}) => {

  const [skills, setSkills] =
    useState("");

  const [minExp, setMinExp] =
    useState("");


  const handleMatch = () => {

    if (!skills.trim() || !minExp) {

      alert(
        "Enter skills and minimum experience."
      );

      return;
    }

    const skillList = skills
      .split(",")
      .map((s) =>
        s.trim().toLowerCase()
      );

    const exp = parseFloat(minExp);


    const matched = candidates
      .filter((c) => {

        const candSkills =
          c.skills?.map((s) =>
            s.toLowerCase()
          ) || [];

        const matchedSkills =
          skillList.filter((skill) =>
            candSkills.includes(skill)
          );

        return (
          matchedSkills.length > 0 &&
          c.experience >= exp
        );
      })


      // VERY IMPORTANT
      .map((c) => {

        const candSkills =
          c.skills?.map((s) =>
            s.toLowerCase()
          ) || [];

        const matchedSkills =
          skillList.filter((skill) =>
            candSkills.includes(skill)
          );

        const matchScore =
          (
            (matchedSkills.length /
              skillList.length) *
            100
          ).toFixed(2);


        let ranking = "Low Match";

        if (matchScore >= 80) {

          ranking = "Excellent Match";

        } else if (matchScore >= 50) {

          ranking = "Good Match";
        }


        return {
          ...c,

          matchedSkills,

          matchScore,

          ranking,
        };
      });


    onMatch(matched);
  };


  return (
    <div className="card">

      <div className="card-header accent-emerald">

        <div className="accent"></div>

        <h2>Match Candidates</h2>

      </div>


      <div className="card-content">

        <div className="form-group">

          <label>
            Required Skills
          </label>

          <input
            value={skills}

            onChange={(e) =>
              setSkills(e.target.value)
            }

            placeholder="React, Node.js"
          />

        </div>


        <div className="form-group">

          <label>
            Minimum Experience
          </label>

          <input
            type="number"

            step="0.5"

            value={minExp}

            onChange={(e) =>
              setMinExp(e.target.value)
            }
          />

        </div>


        <button
          className="btn-emerald"
          onClick={handleMatch}
        >

          Match Candidates

        </button>

      </div>

    </div>
  );
};

export default MatchForm;