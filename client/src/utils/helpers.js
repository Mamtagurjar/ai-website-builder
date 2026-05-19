export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const truncate = (str, n = 80) => {
  return str?.length > n ? str.substring(0, n) + '...' : str
}

export const generateHTML = (websiteData, businessName, colorTheme) => {
  const primary = colorTheme?.primary || '#4f46e5'
  const secondary = colorTheme?.secondary || '#7c3aed'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${websiteData?.seo?.metaTitle || businessName}</title>
  <meta name="description" content="${websiteData?.seo?.metaDescription || ''}" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; color: #1a1a2e; }
    .hero { background: linear-gradient(135deg, ${primary}, ${secondary}); color: white; padding: 100px 20px; text-align: center; }
    .hero h1 { font-size: 3rem; font-weight: 800; margin-bottom: 1rem; }
    .hero p { font-size: 1.25rem; opacity: 0.9; margin-bottom: 2rem; }
    .btn { display: inline-block; background: white; color: ${primary}; padding: 14px 32px; border-radius: 50px; font-weight: 700; text-decoration: none; }
    .section { padding: 80px 20px; max-width: 1100px; margin: 0 auto; }
    .section-title { font-size: 2rem; font-weight: 700; text-align: center; margin-bottom: 1rem; }
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 3rem; }
    .card { background: #f8faff; border-radius: 16px; padding: 28px; border: 1px solid #e5e7eb; }
    .card h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; color: ${primary}; }
    .faq-item { margin-bottom: 1.5rem; padding: 20px; background: #f8faff; border-radius: 12px; }
    .faq-item strong { display: block; margin-bottom: 0.5rem; }
    .cta-section { background: linear-gradient(135deg, ${primary}, ${secondary}); color: white; padding: 80px 20px; text-align: center; }
    .footer { background: #1a1a2e; color: white; padding: 40px 20px; text-align: center; }
    .contact-info p { margin: 8px 0; }
  </style>
</head>
<body>
  <section class="hero">
    <h1>${websiteData?.hero?.title || businessName}</h1>
    <p>${websiteData?.hero?.subtitle || ''}</p>
    <a class="btn" href="#contact">${websiteData?.hero?.buttonText || 'Get Started'}</a>
  </section>

  <div class="section">
    <h2 class="section-title">${websiteData?.about?.title || 'About Us'}</h2>
    <p style="text-align:center;max-width:700px;margin:0 auto;line-height:1.8;color:#555">${websiteData?.about?.description || ''}</p>
  </div>

  <div style="background:#f8faff;padding:20px 0">
    <div class="section">
      <h2 class="section-title">Our Services</h2>
      <div class="grid-3">
        ${(websiteData?.services || []).map(s => `<div class="card"><h3>${s.icon || '✦'} ${s.title}</h3><p>${s.description}</p></div>`).join('')}
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Frequently Asked Questions</h2>
    <div style="max-width:800px;margin:3rem auto 0">
      ${(websiteData?.faq || []).map(f => `<div class="faq-item"><strong>Q: ${f.question}</strong><p>${f.answer}</p></div>`).join('')}
    </div>
  </div>

  <section class="cta-section">
    <h2 style="font-size:2rem;font-weight:800;margin-bottom:1rem">${websiteData?.cta?.title || 'Ready to Get Started?'}</h2>
    <p style="opacity:0.9;margin-bottom:2rem">${websiteData?.cta?.description || ''}</p>
    <a class="btn" href="#contact">${websiteData?.cta?.buttonText || 'Contact Us'}</a>
  </section>

  <div class="section" id="contact">
    <h2 class="section-title">${websiteData?.contact?.title || 'Contact Us'}</h2>
    <div class="contact-info" style="text-align:center;color:#555">
      <p>📧 ${websiteData?.contact?.email || ''}</p>
      <p>📞 ${websiteData?.contact?.phone || ''}</p>
      <p>📍 ${websiteData?.contact?.address || ''}</p>
    </div>
  </div>

  <footer class="footer">
    <p>&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
  </footer>
</body>
</html>`
}

export const generateMarkdown = (websiteData, businessName) => {
  let md = `# ${websiteData?.hero?.title || businessName}\n\n`
  md += `> ${websiteData?.hero?.subtitle || ''}\n\n`
  md += `## About\n\n${websiteData?.about?.description || ''}\n\n`
  md += `## Services\n\n`
  ;(websiteData?.services || []).forEach(s => { md += `### ${s.title}\n${s.description}\n\n` })
  md += `## FAQ\n\n`
  ;(websiteData?.faq || []).forEach(f => { md += `**Q: ${f.question}**\n\n${f.answer}\n\n` })
  md += `## Contact\n\n`
  md += `- Email: ${websiteData?.contact?.email || ''}\n`
  md += `- Phone: ${websiteData?.contact?.phone || ''}\n`
  md += `- Address: ${websiteData?.contact?.address || ''}\n`
  return md
}

export const categoryOptions = [
  'Technology', 'Healthcare', 'Education', 'Finance', 'Real Estate',
  'Restaurant & Food', 'Retail & E-commerce', 'Fashion', 'Beauty & Wellness',
  'Travel & Tourism', 'Consulting', 'Legal', 'Marketing & Advertising',
  'Construction', 'Automotive', 'Events & Entertainment', 'Non-profit', 'Other',
]

export const toneOptions = [
  'Professional', 'Friendly & Casual', 'Luxury & Premium',
  'Bold & Energetic', 'Minimalist & Clean', 'Trustworthy & Authoritative',
]

export const colorThemeOptions = [
  { label: 'Ocean Blue', value: 'blue and white, professional' },
  { label: 'Royal Purple', value: 'purple and violet, elegant' },
  { label: 'Forest Green', value: 'green and white, fresh' },
  { label: 'Sunset Orange', value: 'orange and warm tones, energetic' },
  { label: 'Midnight Dark', value: 'dark navy and gold, premium' },
  { label: 'Rose Pink', value: 'rose pink and white, modern' },
]
