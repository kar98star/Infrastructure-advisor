const { model } = require("./geminiAI");

async function generateArchitecture(requirement) {
  const prompt = `
You are an expert AWS Cloud Architect.

Analyze the following project requirement and return ONLY valid JSON.

Project Requirement:
"${requirement}"

Return the response in this exact format:

{
  "requirement": "",
  "architecture": [],
  "security": [],
  "bestPractices": [],
  "reasoning": [],
  "costBreakdown": {},
  "estimatedCost": "",
  "terraform": ""
}

Rules:
- Return ONLY JSON.
- Do NOT wrap the JSON in markdown.
- Do NOT include explanations outside the JSON.
- Generate realistic AWS services.
- Generate Terraform code.
- Include estimated monthly cost.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  let text = response.text();

  // Remove markdown code blocks if Gemini returns them
  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // Extract only the JSON object
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start !== -1 && end !== -1) {
    text = text.substring(start, end + 1);
  }

  try {
    const parsed = JSON.parse(text);

    return {
      requirement,
      ...parsed,
    };
  } catch (error) {
    console.error("========== JSON PARSE ERROR ==========");
    console.error(text);
    console.error("======================================");

    throw new Error("Failed to parse Gemini response");
  }
}

module.exports = {
  generateArchitecture,
};