// import { useState } from "react";
// import API from "../services/api";

// function AIShortlist({ setAIRecommendation }) {

//   const [requiredSkills, setRequiredSkills] =
//     useState("");

//   const [minExperience, setMinExperience] =
//     useState("");

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     try {

//       setLoading(true);

//       const response = await API.post(
//         "/ai/shortlist",
//         {
//           requiredSkills: requiredSkills
//             .split(",")
//             .map((skill) => skill.trim()),

//           minExperience,
//         }
//       );

//       setAIRecommendation(
//         response.data.aiRecommendation
//       );

//       setLoading(false);

//     } catch (error) {

//       console.log(error);

//       alert("AI Shortlisting Failed");

//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.card}>

//       <h2>AI Candidate Shortlisting</h2>

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
//           {loading
//             ? "Generating AI Response..."
//             : "Get AI Recommendation"}
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

// export default AIShortlist;

// import React, { useState } from "react";
// import API from "../services/api";

// const AIShortlist = ({ onRecommendation }) => {
//   const [jobSkills, setJobSkills] = useState("");
//   const [minExperience, setMinExperience] = useState("2");
//   const [loading, setLoading] = useState(false);

//   const getAIRecommendation = async () => {
//     if (!jobSkills.trim()) {
//       alert("Please enter job skills.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await API.post("/ai/shortlist", {
//         requiredSkills: jobSkills.split(",").map((s) => s.trim()),

//         minExperience: parseInt(minExperience),
//       });
//       onRecommendation(res.data.recommendation);
//     } catch (err) {
//       onRecommendation("AI recommendation failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="card">
//       <div className="card-header accent-purple">
//         <div className="accent"></div>
//         <h2>AI Candidate Shortlisting</h2>
//       </div>
//       <div className="card-content">
//         <div className="form-group">
//           <label>Job Description Skills</label>
//           <input
//             value={jobSkills}
//             onChange={(e) => setJobSkills(e.target.value)}
//             placeholder="React, Node.js, MongoDB"
//           />
//         </div>
//         <div className="form-group">
//           <label>Minimum Experience</label>
//           <input
//             type="number"
//             min="1"
//             value={minExperience}
//             onChange={(e) =>
//               setMinExperience(e.target.value)
//             }
//           />
//         </div>
//         <button
//           className="btn-purple"
//           onClick={getAIRecommendation}
//           disabled={loading}
//         >
//           {loading ? "Fetching..." : "Get AI Recommendation"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AIShortlist;


import React, { useState } from "react";
import API from "../services/api";

const AIShortlist = ({ onRecommendation }) => {

  const [jobSkills, setJobSkills] =
    useState("");

  const [minExperience, setMinExperience] =
    useState("2");

  const [loading, setLoading] =
    useState(false);


  const getAIRecommendation = async () => {

    if (!jobSkills.trim()) {

      alert("Please enter job skills.");

      return;
    }

    setLoading(true);

    try {

      const res = await API.post(
        "/ai/shortlist",
        {

          requiredSkills: jobSkills
            .split(",")
            .map((s) => s.trim()),

          minExperience:
            parseInt(minExperience),
        }
      );


      // VERY IMPORTANT FIX
      onRecommendation(
        res.data.aiRecommendation
      );

    } catch (err) {

      console.log(err);

      onRecommendation(
        "AI recommendation failed. Please try again."
      );

    } finally {

      setLoading(false);
    }
  };


  return (
    <div className="card">

      <div className="card-header accent-purple">

        <div className="accent"></div>

        <h2>
          AI Candidate Shortlisting
        </h2>

      </div>

      <div className="card-content">

        <div className="form-group">

          <label>
            Job Description Skills
          </label>

          <input
            value={jobSkills}

            onChange={(e) =>
              setJobSkills(e.target.value)
            }

            placeholder="React, Node.js, MongoDB"
          />

        </div>


        <div className="form-group">

          <label>
            Minimum Experience
          </label>

          <input
            type="number"
            min="1"
            value={minExperience}

            onChange={(e) =>
              setMinExperience(e.target.value)
            }
          />

        </div>


        <button
          className="btn-purple"
          onClick={getAIRecommendation}
          disabled={loading}
        >

          {loading
            ? "Fetching..."
            : "Get AI Recommendation"}

        </button>

      </div>

    </div>
  );
};

export default AIShortlist;