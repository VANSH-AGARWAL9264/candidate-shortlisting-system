// function CandidateList({ candidates }) {

//   return (
//     <div style={styles.card}>

//       <h2>Candidate List</h2>

//       {candidates.map((candidate) => (

//         <div key={candidate._id} style={styles.item}>

//           <h3>{candidate.name}</h3>

//           <p>
//             <strong>Email:</strong> {candidate.email}
//           </p>

//           <p>
//             <strong>Skills:</strong>{" "}
//             {candidate.skills.join(", ")}
//           </p>

//           <p>
//             <strong>Experience:</strong>{" "}
//             {candidate.experience} years
//           </p>

//           <p>
//             <strong>Bio:</strong> {candidate.bio}
//           </p>

//         </div>
//       ))}
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

//   item: {
//     border: "1px solid #ccc",
//     padding: "10px",
//     marginBottom: "10px",
//   },
// };

// export default CandidateList;



// import React from "react";

// const CandidateList = ({ title, candidates, variant = "default" }) => {
//   if (!candidates.length) {
//     return (
//       <div className="card">
//         <div className="card-header">
//           <div className="accent"></div>
//           <h2>{title}</h2>
//         </div>
//         <div className="empty-state">No candidates available.</div>
//       </div>
//     );
//   }

//   return (
//     <div className="card">
//       <div className="card-header">
//         <div className="accent"></div>
//         <h2>{title}</h2>
//       </div>
//       <div>
//         {candidates.map((cand, idx) => (
//           <div key={idx} className="candidate-item">
//             <div className="candidate-avatar">{cand.name.charAt(0)}</div>
//             <div className="candidate-info">
//               <div className="candidate-name">{cand.name}</div>
//               <div className="candidate-email">{cand.email}</div>
//               <div>
//                 {cand.skills?.map((skill, i) => (
//                   <span key={i} className="skill-badge">{skill}</span>
//                 ))}
//               </div>
//               <div className="candidate-exp">Experience: {cand.experience} years</div>
//               {cand.bio && <div className="candidate-bio">{cand.bio}</div>}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CandidateList;



import React from "react";

const CandidateList = ({
  title,
  candidates,
  variant = "default",
}) => {

  if (!candidates.length) {

    return (
      <div className="card">

        <div className="card-header">

          <div className="accent"></div>

          <h2>{title}</h2>

        </div>

        <div className="empty-state">
          No candidates available.
        </div>

      </div>
    );
  }


  return (
    <div className="card">

      <div className="card-header">

        <div className="accent"></div>

        <h2>{title}</h2>

      </div>


      <div>

        {candidates.map((cand, idx) => (

          <div
            key={idx}
            className="candidate-item"
          >

            <div className="candidate-avatar">

              {cand.name.charAt(0)}

            </div>


            <div className="candidate-info">

              <div className="candidate-name">

                {cand.name}

              </div>


              {/* MATCHED CANDIDATES UI */}

              {variant === "matched" ? (

                <>

                  <div className="match-info">

                    <strong>Match Score:</strong>{" "}
                    {cand.matchScore}%

                  </div>

                  <div className="match-info">

                    <strong>Ranking:</strong>{" "}
                    {cand.ranking}

                  </div>

                  <div className="match-info">

                    <strong>Matched Skills:</strong>{" "}

                    {cand.matchedSkills?.join(", ")}

                  </div>

                </>

              ) : (

                <>
                  <div className="candidate-email">

                    {cand.email}

                  </div>

                  <div>

                    {cand.skills?.map(
                      (skill, i) => (

                        <span
                          key={i}
                          className="skill-badge"
                        >

                          {skill}

                        </span>
                      )
                    )}

                  </div>

                  <div className="candidate-exp">

                    Experience: {cand.experience} years

                  </div>

                  {cand.bio && (

                    <div className="candidate-bio">

                      {cand.bio}

                    </div>
                  )}
                </>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default CandidateList;