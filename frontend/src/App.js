import React, { useState, useEffect } from "react";
import API from "./services/api";
import CandidateForm from "./components/CandidateForm";
import CandidateList from "./components/CandidateList";
import MatchForm from "./components/MatchForm";
import AIShortlist from "./components/AIShortlist";
import "./App.css";
import ReactMarkdown from "react-markdown";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [matchedCandidates, setMatchedCandidates] = useState([]);
  const [aiRecommendation, setAiRecommendation] = useState("");

  const fetchCandidates = async () => {
    try {
      const response = await API.get("/candidates");
      setCandidates(response.data.candidates);
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const addCandidate = async (candidateData) => {
    await API.post("/candidates", candidateData);
    fetchCandidates();
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>AI Candidate Shortlisting System</h1>
          <p>Smart recruitment powered by artificial intelligence</p>
        </div>
      </header>

      <main className="container main-grid">
        <div className="left-column">
          <CandidateForm onSubmit={addCandidate} />
          <MatchForm candidates={candidates} onMatch={setMatchedCandidates} />
          <AIShortlist onRecommendation={setAiRecommendation} />
        </div>

        <div className="right-column">
          <CandidateList title="Candidate List" candidates={candidates} />
          {matchedCandidates.length > 0 && (
            <CandidateList
              title="Matched Candidates"
              candidates={matchedCandidates}
              variant="matched"
            />
          )}
          {aiRecommendation && (
            <div className="ai-card">
              <h3>🤖 AI Recommendation</h3>
                <div className="ai-output">

                  <ReactMarkdown>
                    {aiRecommendation}
                  </ReactMarkdown>

                </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;