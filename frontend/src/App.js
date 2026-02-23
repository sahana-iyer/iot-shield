import { useState } from "react";
import axios from "axios";

const INITIAL_FEATURES = {
  src_bytes: "", dst_bytes: "", flag: "", protocol_type: "",
  service: "", count: "", serror_rate: "", duration: "",
  wrong_fragment: "", urgent: ""
};

export default function App() {
  const [features, setFeatures] = useState(INITIAL_FEATURES);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setFeatures({ ...features, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/predict/", features);
      setResult(res.data);
      setHistory(prev => [{ ...res.data, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 9)]);
    } catch (err) {
      setResult({ error: "Backend connection failed" });
    }
    setLoading(false);
  };

  const threatColor = (level) => {
    if (level === "HIGH") return "#ff4444";
    if (level === "MEDIUM") return "#ffaa00";
    return "#00FF41";
  };

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", color: "#00FF41", fontFamily: "monospace", padding: "2rem" }}>
      
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem", borderBottom: "1px solid #00FF41", paddingBottom: "1rem" }}>
        <h1 style={{ fontSize: "2rem", letterSpacing: "0.3rem", margin: 0 }}>IOT-SHIELD</h1>
        <p style={{ color: "#00aa29", margin: "0.5rem 0 0" }}>Network Intrusion Detection System · XGBoost · NSL-KDD</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Input Panel */}
        <div style={{ border: "1px solid #00FF41", padding: "1.5rem", borderRadius: "8px" }}>
          <h2 style={{ fontSize: "1rem", letterSpacing: "0.2rem", marginTop: 0 }}>&gt; INPUT PARAMETERS</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {Object.keys(INITIAL_FEATURES).map((key) => (
              <div key={key}>
                <label style={{ fontSize: "0.7rem", color: "#00aa29", display: "block", marginBottom: "0.2rem" }}>
                  {key.toUpperCase()}
                </label>
                <input
                  type="number"
                  name={key}
                  value={features[key]}
                  onChange={handleChange}
                  style={{
                    width: "100%", background: "#0d0d0d", border: "1px solid #00FF41",
                    color: "#00FF41", padding: "0.4rem", fontFamily: "monospace",
                    borderRadius: "4px", boxSizing: "border-box"
                  }}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              marginTop: "1.5rem", width: "100%", padding: "0.75rem",
              background: loading ? "#003300" : "#00FF41", color: "#0d0d0d",
              border: "none", fontFamily: "monospace", fontWeight: "bold",
              fontSize: "1rem", cursor: "pointer", borderRadius: "4px",
              letterSpacing: "0.2rem"
            }}
          >
            {loading ? "ANALYSING..." : "▶ ANALYSE TRAFFIC"}
          </button>
        </div>

        {/* Result + History Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Result */}
          <div style={{ border: "1px solid #00FF41", padding: "1.5rem", borderRadius: "8px", minHeight: "180px" }}>
            <h2 style={{ fontSize: "1rem", letterSpacing: "0.2rem", marginTop: 0 }}>&gt; DETECTION RESULT</h2>
            {!result && <p style={{ color: "#003300" }}>Awaiting input...</p>}
            {result?.error && <p style={{ color: "#ff4444" }}>{result.error}</p>}
            {result && !result.error && (
              <div>
                <div style={{
                  fontSize: "1.8rem", fontWeight: "bold", letterSpacing: "0.2rem",
                  color: result.prediction === 1 ? "#ff4444" : "#00FF41",
                  marginBottom: "1rem"
                }}>
                  {result.prediction === 1 ? "⚠ ATTACK DETECTED" : "✓ NORMAL TRAFFIC"}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  <div style={{ border: "1px solid #003300", padding: "0.5rem", borderRadius: "4px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#00aa29" }}>CONFIDENCE</div>
                    <div style={{ fontSize: "1.2rem" }}>{result.confidence}</div>
                  </div>
                  <div style={{ border: "1px solid #003300", padding: "0.5rem", borderRadius: "4px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#00aa29" }}>THREAT LEVEL</div>
                    <div style={{ fontSize: "1.2rem", color: threatColor(result.threat_level) }}>{result.threat_level}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* History */}
          <div style={{ border: "1px solid #00FF41", padding: "1.5rem", borderRadius: "8px", flex: 1 }}>
            <h2 style={{ fontSize: "1rem", letterSpacing: "0.2rem", marginTop: 0 }}>&gt; DETECTION LOG</h2>
            {history.length === 0 && <p style={{ color: "#003300" }}>No records yet...</p>}
            {history.map((h, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "0.4rem 0", borderBottom: "1px solid #003300", fontSize: "0.85rem"
              }}>
                <span style={{ color: h.prediction === 1 ? "#ff4444" : "#00FF41" }}>
                  {h.prediction === 1 ? "⚠ ATTACK" : "✓ NORMAL"}
                </span>
                <span style={{ color: threatColor(h.threat_level) }}>{h.threat_level}</span>
                <span>{h.confidence}</span>
                <span style={{ color: "#00aa29", fontSize: "0.75rem" }}>{h.time}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
