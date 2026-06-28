const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
  generateArchitecture,
} = require("./services/geminiService");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CloudArchitect AI Backend Running",
  });
});

app.post("/api/analyze", async (req, res) => {
  try {
    const { requirement } = req.body;

    if (!requirement) {
      return res.status(400).json({
        success: false,
        message: "Requirement is required",
      });
    }

    const result =
      await generateArchitecture(requirement);

    // DEBUG LOG
    console.log(
      "===================================="
    );
    console.log("ANALYSIS RESULT:");
    console.log(result);
    console.log(
      "===================================="
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("API ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});