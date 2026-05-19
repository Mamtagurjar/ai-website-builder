const { generateWebsiteContent, generateSectionContent } = require('../ai/geminiService');

// @desc   Generate full website content from business info
// @route  POST /api/ai/generate
const generateContent = async (req, res) => {
  try {
    const businessData = req.body;

    if (!businessData.businessName || !businessData.category) {
      return res.status(400).json({ message: 'Business name and category are required' });
    }

    const websiteData = await generateWebsiteContent(businessData);
    res.json({ websiteData });
  } catch (error) {
    console.error('AI Generation Error:', error.message);
    res.status(500).json({ message: 'AI generation failed: ' + error.message });
  }
};

// @desc   Regenerate a single section
// @route  POST /api/ai/regenerate-section
const regenerateSection = async (req, res) => {
  try {
    const { section, businessData } = req.body;

    if (!section || !businessData) {
      return res.status(400).json({ message: 'Section and business data are required' });
    }

    const sectionData = await generateSectionContent(section, businessData);
    res.json({ section, data: sectionData });
  } catch (error) {
    console.error('Section Regeneration Error:', error.message);
    res.status(500).json({ message: 'Section regeneration failed: ' + error.message });
  }
};

module.exports = { generateContent, regenerateSection };
