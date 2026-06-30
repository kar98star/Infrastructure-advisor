const { model } = require("./geminiAI");

function normalizeArchitectureItem(item) {
  if (typeof item === "string") {
    const match = item.match(/^(.+?)\s*\((.+)\)$/);
    return match
      ? { component: match[1].trim(), description: match[2].trim(), services: [] }
      : { component: item, description: "", services: [] };
  }

  return {
    component: item.component || item.service || item.role || "Unknown Service",
    description: item.description || item.purpose || "",
    services: Array.isArray(item.services) ? item.services : [],
  };
}

function normalizeCostBreakdown(costBreakdown) {
  if (Array.isArray(costBreakdown)) {
    return costBreakdown.map((entry) => ({
      service: entry.service || entry.name || "Unknown",
      cost: entry.cost || entry.amount || "",
    }));
  }

  // Fallback: if Gemini still returns an object map, convert it
  if (costBreakdown && typeof costBreakdown === "object") {
    return Object.entries(costBreakdown).map(([service, cost]) => ({
      service,
      cost: String(cost),
    }));
  }

  return [];
}

async function generateArchitecture(requirement) {
  const prompt = `
You are an expert AWS Cloud Architect.

Analyze the following project requirement and return ONLY valid JSON.

Project Requirement:
"${requirement}"

Return ONLY valid JSON in exactly this format.

{
  "requirement": "",
  "architecture": [
    {
      "component": "",
      "description": "",
      "services": []
    }
  ],
  "security": [],
  "bestPractices": [],
  "reasoning": [],
  "costBreakdown": [
    {
      "service": "",
      "cost": ""
    }
  ],
  "estimatedCost": "",
  "terraform": ""
}

Rules:
- Every architecture item MUST contain:
  - component
  - description
  - services (array of AWS services)
- Never use keys like service or purpose for architecture items.
- Always return services as an array of strings.
- costBreakdown MUST be an array of objects, each with "service" and "cost" fields. Do NOT return costBreakdown as an object/map.
- Return ONLY valid JSON.

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
      architecture: (parsed.architecture || []).map(normalizeArchitectureItem),
      costBreakdown: normalizeCostBreakdown(parsed.costBreakdown),
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