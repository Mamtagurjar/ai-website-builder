const buildWebsitePrompt = (data) => {
  return `
You are an expert website copywriter and content strategist. Generate complete, professional website content for the following business.

BUSINESS INFORMATION:
- Business Name: ${data.businessName}
- Category/Industry: ${data.category}
- Services Offered: ${data.services || 'General services'}
- Target Audience: ${data.targetAudience || 'General public'}
- Business Description: ${data.description || 'A professional business'}
- Tone/Style: ${data.tone || 'Professional and friendly'}
- Preferred Color Theme: ${data.colorTheme || 'Blue and white'}
- Contact Email: ${data.contactEmail || 'contact@business.com'}
- Contact Phone: ${data.contactPhone || '+1 (555) 000-0000'}
- Address: ${data.address || 'Main Street, City'}

TASK:
Generate a complete website content structure as a valid JSON object.

REQUIREMENTS:
- Write compelling, conversion-focused copy
- Make the content specific to the business (not generic)
- Use the specified tone throughout
- Each section should feel natural and professional
- Services array should have 4-6 items
- Testimonials array should have 3 items
- FAQ array should have 5-6 items
- All text must be original and unique

RESPOND WITH ONLY valid JSON (no markdown, no explanation, no code fences). The JSON must match this exact structure:

{
  "hero": {
    "title": "Main headline (compelling, benefit-focused)",
    "subtitle": "Supporting text that explains the value proposition in 1-2 sentences",
    "buttonText": "Primary CTA button text"
  },
  "about": {
    "title": "About section heading",
    "description": "2-3 paragraph description of the business, mission, and values"
  },
  "services": [
    {
      "title": "Service name",
      "description": "2-3 sentence description of this service",
      "icon": "emoji icon"
    }
  ],
  "testimonials": [
    {
      "name": "Customer full name",
      "role": "Customer job title or description",
      "text": "Authentic testimonial quote about the service"
    }
  ],
  "faq": [
    {
      "question": "Common customer question",
      "answer": "Detailed, helpful answer"
    }
  ],
  "cta": {
    "title": "Call to action heading",
    "description": "Supporting text for the CTA section",
    "buttonText": "CTA button text"
  },
  "contact": {
    "title": "Contact section heading",
    "description": "Invitation to get in touch",
    "email": "${data.contactEmail || 'contact@business.com'}",
    "phone": "${data.contactPhone || '+1 (555) 000-0000'}",
    "address": "${data.address || 'Main Street, City'}"
  },
  "seo": {
    "metaTitle": "SEO page title (under 60 chars)",
    "metaDescription": "SEO meta description (under 160 chars)",
    "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
  },
  "colorTheme": {
    "primary": "#hex color based on preference",
    "secondary": "#hex color",
    "accent": "#hex color"
  }
}
`;
};

const buildSectionPrompt = (section, data) => {
  const sectionSchemas = {
    hero: `{
      "title": "Compelling headline",
      "subtitle": "Supporting subtitle text",
      "buttonText": "CTA button text"
    }`,
    about: `{
      "title": "About section heading",
      "description": "2-3 paragraphs about the business"
    }`,
    services: `[
      { "title": "Service name", "description": "Service description", "icon": "emoji" }
    ]`,
    faq: `[
      { "question": "Question", "answer": "Answer" }
    ]`,
    testimonials: `[
      { "name": "Name", "role": "Role", "text": "Testimonial" }
    ]`,
    cta: `{
      "title": "CTA heading",
      "description": "CTA description",
      "buttonText": "Button text"
    }`,
    seo: `{
      "metaTitle": "SEO title",
      "metaDescription": "SEO description",
      "keywords": ["kw1", "kw2"]
    }`,
  };

  return `
You are a professional website copywriter. Regenerate ONLY the "${section}" section content for this business:

Business: ${data.businessName}
Category: ${data.category}
Tone: ${data.tone || 'Professional'}
Description: ${data.description || 'A professional business'}

RESPOND WITH ONLY valid JSON matching this structure (no markdown, no explanation):
${sectionSchemas[section] || '{}'}
`;
};

module.exports = { buildWebsitePrompt, buildSectionPrompt };
