const { GoogleGenerativeAI } = require('@google/generative-ai');
const { buildWebsitePrompt, buildSectionPrompt } = require('./promptTemplates');

const getGeminiClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

const cleanJSON = (text) => {
  // Remove markdown code fences if present
  let cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return cleaned;
};

const generateWebsiteContent = async (businessData) => {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = buildWebsitePrompt(businessData);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    const cleaned = cleanJSON(text);
    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch (err) {
    console.error('JSON Parse Error. Raw response:', text.substring(0, 500));
    throw new Error('Failed to parse AI response as JSON. Try again.');
  }
};

const generateSectionContent = async (section, businessData) => {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = buildSectionPrompt(section, businessData);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    const cleaned = cleanJSON(text);
    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch (err) {
    throw new Error('Failed to parse section response as JSON.');
  }
};

module.exports = { generateWebsiteContent, generateSectionContent };
