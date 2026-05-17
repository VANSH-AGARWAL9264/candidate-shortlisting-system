// import { useState } from "react";
// import API from "../services/api";

// function CandidateForm({ fetchCandidates }) {

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     skills: "",
//     experience: "",
//     bio: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {

//       const payload = {
//         ...formData,

//         skills: formData.skills
//           .split(",")
//           .map((skill) => skill.trim()),
//       };

//       await API.post("/candidates", payload);

//       alert("Candidate Added Successfully");

//       setFormData({
//         name: "",
//         email: "",
//         skills: "",
//         experience: "",
//         bio: "",
//       });

//       fetchCandidates();

//     } catch (error) {
//       console.log(error);
//       alert("Error adding candidate");
//     }
//   };

//   return (
//     <div style={styles.card}>

//       <h2>Add Candidate</h2>

//       <form onSubmit={handleSubmit}>

//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />

//         <input
//           type="text"
//           name="skills"
//           placeholder="Skills (React, Node.js)"
//           value={formData.skills}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />

//         <input
//           type="number"
//           name="experience"
//           placeholder="Experience"
//           value={formData.experience}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />

//         <textarea
//           name="bio"
//           placeholder="Bio"
//           value={formData.bio}
//           onChange={handleChange}
//           style={styles.textarea}
//         />

//         <button type="submit" style={styles.button}>
//           Add Candidate
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

//   textarea: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "10px",
//   },

//   button: {
//     padding: "10px 20px",
//     cursor: "pointer",
//   },
// };

// export default CandidateForm;



import React, { useState } from "react";

const CandidateForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "", email: "", skills: "", experience: "", bio: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        skills: formData.skills.split(",").map(s => s.trim()),
        experience: parseFloat(formData.experience)
      });
      setFormData({ name: "", email: "", skills: "", experience: "", bio: "" });
      setMessage({ type: "success", text: "Candidate added successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to add candidate." });
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="accent"></div>
        <h2>Add Candidate</h2>
      </div>
      <div className="card-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Skills (comma separated)</label>
            <input name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js" required />
          </div>
          <div className="form-group">
            <label>Experience (years)</label>
            <input type="number" step="0.5" name="experience" value={formData.experience} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea name="bio" rows="3" value={formData.bio} onChange={handleChange} />
          </div>
          <button type="submit" disabled={submitting}>{submitting ? "Adding..." : "Add Candidate"}</button>
          {message && (
            <div style={{ marginTop: 12, fontSize: 13, padding: 8, borderRadius: 12, background: message.type === "success" ? "#d1fae5" : "#fee2e2", color: message.type === "success" ? "#065f46" : "#991b1b" }}>
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;