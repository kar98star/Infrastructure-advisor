import jsPDF from "jspdf";
import { useState, useEffect } from "react";
import ArchitectureDiagram from "./components/ArchitectureDiagram";
import { analyzeRequirement } from "./services/api";
import "./App.css";

function App() {
const [requirement, setRequirement] = useState("");
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);
const [history, setHistory] = useState([]);

useEffect(() => {
  const savedHistory =
    JSON.parse(
      localStorage.getItem(
        "architectureHistory"
      )
    ) || [];

  setHistory(savedHistory);
}, []);

const handleAnalyze = async () => {
if (!requirement.trim()) {
alert("Please enter your project requirement");
return;
}

try {
  setLoading(true);

  const response = await analyzeRequirement(
    requirement
  );

  console.log(
  JSON.stringify(response.architecture, null, 2)
);

  setResult(response);

  const updatedHistory = [
    requirement,
    ...history,
  ].slice(0, 5);

  localStorage.setItem(
    "architectureHistory",
    JSON.stringify(updatedHistory)
  );

  setHistory(updatedHistory);
} catch (error) {
  console.error(error);
  alert("Failed to generate architecture");
} finally {
  setLoading(false);
}
};

const downloadPDF = () => {
  if (!result) return;

  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(18);
  doc.text("CloudArchitect AI Report", 20, y);

  y += 15;

  doc.setFontSize(12);

  doc.text(
    `Requirement: ${result.requirement}`,
    20,
    y
  );

  y += 15;

  doc.text("AWS Architecture:", 20, y);

  y += 10;

  result.architecture?.forEach((item) => {
    doc.text(`• ${item.component}`, 25, y);
    y += 8;
    doc.text(item.description, 30, y);
    y += 10;
  });

  y += 10;

  doc.text(
    "Security Recommendations:",
    20,
    y
  );

  y += 10;

  result.security?.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  y += 10;

  doc.text(
    `Estimated Cost: ${result.estimatedCost}`,
    20,
    y
  );

  y += 15;

  doc.text("AI Reasoning:", 20, y);

  y += 10;

  result.reasoning?.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 8;
  });

  doc.save("cloudarchitect-report.pdf");
};

const downloadTerraform = () => {
  if (!result?.terraform) return;

  const blob = new Blob(
    [result.terraform],
    { type: "text/plain" }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = "main.tf";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};

return (
    <div className="container">
      <div className="hero-section">
        <h1>☁️ CloudArchitect AI</h1>

        <p className="subtitle">
          Design AWS Architectures with Artificial Intelligence
        </p>

    <div className="input-section">
      <textarea
        placeholder="Example: Build a food delivery application for 50,000 users with real-time order tracking..."
        value={requirement}
        onChange={(e) =>
          setRequirement(e.target.value)
        }
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading
          ? "Generating Architecture..."
          : "🚀 Generate Architecture"}
      </button>
    </div>
  </div>

  {result && (
    <>
      {/* Architecture Diagram */}
      <div className="diagram-card">
        <h2>🏗 Architecture Flow</h2>

        <ArchitectureDiagram
  services={
    (result.architecture || []).map((item) => item.component || item.service)
  }
/>
      </div>

      {/* Main Cards */}
      <div className="results">

        {/* Architecture */}
        <div className="card">
          <h2>🏗 AWS Architecture</h2>

          <ul>
  {(result.architecture || []).map((item, index) => (
    <li key={index}>
      <strong>{item.component || item.service || "Unknown Service"}</strong>
      <br />
      {item.description || item.role || ""}
      <br />
      <small>
        {item.services?.join(", ")}
      </small>
    </li>
  ))}
</ul>
        </div>

        {/* Security */}
        <div className="card">
          <h2>🔐 Security Recommendations</h2>

          <ul>
            {(result.security || []).map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* AWS Best Practices */}
        <div className="card">
          <h2>☁️ AWS Best Practices</h2>

          <ul>
            {(result.bestPractices || []).map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Cost Column */}
        <div className="cost-column">

          <div className="card cost-card">
            <h2>💰 Estimated Cost</h2>

            <p className="cost">
              {result.estimatedCost ||
                "$0/month"}
            </p>
          </div>

          <div className="card">
            <h2>💵 Cost Breakdown</h2>

            <ul>
              {Object.entries(
                result.costBreakdown || {}
              ).map(
                ([service, cost]) => (
                  <li key={service}>
                    <strong>
                      {service}
                    </strong>
: {cost}
                  </li>
                )
              )}
            </ul>
          </div>

        </div>
      </div>

      {/* AI Reasoning */}
      <div className="requirement-card">
        <h2>🤖 AI Reasoning</h2>

        <ul>
          {(result.reasoning || []).map(
            (item, index) => (
              <li key={index}>
                {item}
              </li>
            )
          )}
        </ul>
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <button onClick={downloadPDF}>
          📄 Export Report
        </button>
        <button
          onClick={downloadTerraform}
          style={{
            marginLeft: "10px",
          }}
        >
          📥 Download Terraform
        </button>
      </div>

      {/* Terraform Code */}
      <div className="requirement-card">
        <h2>
          🏗 Terraform Infrastructure Code
        </h2>

        <pre
          style={{
            overflowX: "auto",
            background: "#0f172a",
            padding: "20px",
            borderRadius: "10px",
            color: "#22c55e",
            marginTop: "15px",
            whiteSpace: "pre-wrap",
          }}
        >
          {result.terraform ||
            "No Terraform generated"}
        </pre>
      </div>

      {/* Deployment Guide */}
<div className="requirement-card">
  <h2>🚀 Deployment Guide</h2>

  <ol className="deployment-guide">
    <li>Install Terraform on your system.</li>
    <li>Install and configure AWS CLI.</li>
    <li>Run <code>aws configure</code> and enter your AWS credentials.</li>
    <li>Save the generated Terraform code as <strong>main.tf</strong>.</li>
    <li>Open a terminal in the Terraform project folder.</li>
    <li>Run <code>terraform init</code>.</li>
    <li>Run <code>terraform plan</code> to preview the infrastructure.</li>
    <li>Run <code>terraform apply</code> to create AWS resources.</li>
    <li>Verify the deployed resources in the AWS Management Console.</li>
    <li>When finished, run <code>terraform destroy</code> to remove the resources.</li>
  </ol>
</div>

      {/* Requirement Summary */}
      <div className="requirement-card">
        <h2>📋 Project Requirement</h2>

        <p>{result.requirement}</p>
      </div>

      {/* Architecture History */}
      <div className="requirement-card">
        <h2>📜 Architecture History</h2>

        <ul>
          {history.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  )}
    </div>
  );
}

export default App;
