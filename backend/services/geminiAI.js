const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const architectureSchema = {
  type: SchemaType.OBJECT,
  properties: {
    requirement: { type: SchemaType.STRING },
    architecture: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          component: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          services: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
          },
        },
        required: ["component", "description", "services"],
      },
    },
    security: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
    bestPractices: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
    reasoning: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
    costBreakdown: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          service: { type: SchemaType.STRING },
          cost: { type: SchemaType.STRING },
        },
        required: ["service", "cost"],
      },
    },
    estimatedCost: { type: SchemaType.STRING },
    terraform: { type: SchemaType.STRING },
  },
  required: [
    "requirement",
    "architecture",
    "security",
    "bestPractices",
    "reasoning",
    "costBreakdown",
    "estimatedCost",
    "terraform",
  ],
};

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: architectureSchema,
  },
});

module.exports = { model };