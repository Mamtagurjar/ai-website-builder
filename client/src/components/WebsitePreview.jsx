export default function WebsitePreview({ websiteData, businessName }) {
  if (!websiteData) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-24 text-center px-8">
        <div className="text-6xl mb-6">🖥️</div>
        <h3 className="text-xl font-bold text-gray-600 dark:text-gray-300 mb-2">Preview will appear here</h3>
        <p className="text-gray-400 text-sm">Fill in your business details and generate your website</p>
      </div>
    )
  }

  const primary = websiteData.colorTheme?.primary || '#4f46e5'
  const secondary = websiteData.colorTheme?.secondary || '#7c3aed'
  const accent = websiteData.colorTheme?.accent || '#06b6d4'

  return (
    <div className="font-sans text-gray-900 text-[13px] leading-relaxed">
      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }} className="text-white px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-3 leading-tight">{websiteData.hero?.title || businessName}</h1>
        <p className="text-sm opacity-90 mb-6 max-w-lg mx-auto">{websiteData.hero?.subtitle}</p>
        <button style={{ background: 'white', color: primary }} className="px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
          {websiteData.hero?.buttonText || 'Get Started'}
        </button>
      </section>

      {/* About */}
      {websiteData.about && (
        <section className="px-6 py-12 bg-white">
          <h2 className="text-2xl font-bold text-center mb-4" style={{ color: primary }}>{websiteData.about?.title}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto text-sm leading-relaxed">{websiteData.about?.description}</p>
        </section>
      )}

      {/* Services */}
      {websiteData.services?.length > 0 && (
        <section className="px-6 py-12 bg-gray-50">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: primary }}>Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {websiteData.services.map((svc, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="text-3xl mb-2">{svc.icon || '⭐'}</div>
                <h3 className="font-bold mb-1.5" style={{ color: primary }}>{svc.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{svc.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {websiteData.testimonials?.length > 0 && (
        <section className="px-6 py-12 bg-white">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: primary }}>What Our Clients Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {websiteData.testimonials.map((t, i) => (
              <div key={i} className="rounded-xl p-5 border border-gray-100 bg-gray-50">
                <p className="text-gray-600 text-xs leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div style={{ background: primary }} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {t.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-xs">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {websiteData.faq?.length > 0 && (
        <section className="px-6 py-12 bg-gray-50">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: primary }}>Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {websiteData.faq.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="font-semibold text-sm mb-1" style={{ color: primary }}>Q: {f.question}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      {websiteData.cta && (
        <section style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }} className="text-white px-6 py-12 text-center">
          <h2 className="text-2xl font-bold mb-3">{websiteData.cta?.title}</h2>
          <p className="text-sm opacity-90 mb-6 max-w-lg mx-auto">{websiteData.cta?.description}</p>
          <button className="bg-white px-6 py-2.5 rounded-full font-bold text-sm" style={{ color: primary }}>
            {websiteData.cta?.buttonText || 'Get Started'}
          </button>
        </section>
      )}

      {/* Contact */}
      {websiteData.contact && (
        <section className="px-6 py-12 bg-white">
          <h2 className="text-2xl font-bold text-center mb-3" style={{ color: primary }}>{websiteData.contact?.title || 'Contact Us'}</h2>
          <p className="text-gray-500 text-center text-sm mb-6">{websiteData.contact?.description}</p>
          <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
            {websiteData.contact?.email && <p>📧 {websiteData.contact.email}</p>}
            {websiteData.contact?.phone && <p>📞 {websiteData.contact.phone}</p>}
            {websiteData.contact?.address && <p>📍 {websiteData.contact.address}</p>}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-6 py-6 text-center text-xs text-gray-400 bg-gray-900 text-gray-400">
        © {new Date().getFullYear()} {businessName}. All rights reserved.
      </footer>
    </div>
  )
}
