import { useState } from 'react'
import { aiService } from '../services/aiService'
import toast from 'react-hot-toast'
import { FiChevronDown, FiChevronUp, FiRefreshCw, FiPlus, FiTrash2 } from 'react-icons/fi'

const SectionHeader = ({ title, isOpen, onToggle, onRegenerate, regenerating }) => (
  <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors" onClick={onToggle}>
    <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">{title}</span>
    <div className="flex items-center gap-2">
      {onRegenerate && (
        <button
          onClick={(e) => { e.stopPropagation(); onRegenerate() }}
          disabled={regenerating}
          title="Regenerate with AI"
          className="p-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-500 hover:text-indigo-700 transition-colors disabled:opacity-50"
        >
          <FiRefreshCw size={13} className={regenerating ? 'animate-spin' : ''} />
        </button>
      )}
      {isOpen ? <FiChevronUp size={14} className="text-gray-400" /> : <FiChevronDown size={14} className="text-gray-400" />}
    </div>
  </div>
)

const Field = ({ label, value, onChange, multiline = false, placeholder = '' }) => (
  <div className="mb-3">
    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</label>
    {multiline ? (
      <textarea rows={3} value={value || ''} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} className="input-field text-sm resize-none" />
    ) : (
      <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} className="input-field text-sm" />
    )}
  </div>
)

export default function WebsiteEditor({ websiteData, onChange, businessData }) {
  const [open, setOpen] = useState({ hero: true })
  const [regenerating, setRegenerating] = useState({})

  const toggle = (key) => setOpen((p) => ({ ...p, [key]: !p[key] }))

  const update = (path, value) => {
    const keys = path.split('.')
    const newData = JSON.parse(JSON.stringify(websiteData))
    let obj = newData
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
    obj[keys[keys.length - 1]] = value
    onChange(newData)
  }

  const updateArr = (key, index, field, value) => {
    const newData = JSON.parse(JSON.stringify(websiteData))
    newData[key][index][field] = value
    onChange(newData)
  }

  const addArrayItem = (key, template) => {
    const newData = JSON.parse(JSON.stringify(websiteData))
    newData[key] = [...(newData[key] || []), template]
    onChange(newData)
  }

  const removeArrayItem = (key, index) => {
    const newData = JSON.parse(JSON.stringify(websiteData))
    newData[key].splice(index, 1)
    onChange(newData)
  }

  const handleRegenerate = async (section) => {
    if (!businessData?.businessName) return toast.error('No business data found')
    setRegenerating((p) => ({ ...p, [section]: true }))
    try {
      const { data } = await aiService.regenerateSection(section, businessData)
      const newData = JSON.parse(JSON.stringify(websiteData))
      newData[section] = data.data
      onChange(newData)
      toast.success(`${section} section regenerated!`)
    } catch {
      toast.error('Regeneration failed')
    } finally {
      setRegenerating((p) => ({ ...p, [section]: false }))
    }
  }

  if (!websiteData) return (
    <div className="p-6 text-center text-gray-400 text-sm">
      Generate website content first using the form.
    </div>
  )

  const sectionClass = "border border-gray-100 dark:border-gray-700 rounded-xl mb-3 overflow-hidden bg-white dark:bg-gray-800"

  return (
    <div className="space-y-0">
      {/* Hero */}
      <div className={sectionClass}>
        <SectionHeader title="🚀 Hero Section" isOpen={open.hero} onToggle={() => toggle('hero')}
          onRegenerate={() => handleRegenerate('hero')} regenerating={regenerating.hero} />
        {open.hero && (
          <div className="p-4 pt-0 border-t border-gray-50 dark:border-gray-700">
            <Field label="Headline" value={websiteData.hero?.title} onChange={(v) => update('hero.title', v)} placeholder="Main headline..." />
            <Field label="Subtitle" value={websiteData.hero?.subtitle} onChange={(v) => update('hero.subtitle', v)} multiline placeholder="Supporting subtitle..." />
            <Field label="Button Text" value={websiteData.hero?.buttonText} onChange={(v) => update('hero.buttonText', v)} placeholder="Get Started" />
          </div>
        )}
      </div>

      {/* About */}
      <div className={sectionClass}>
        <SectionHeader title="ℹ️ About Section" isOpen={open.about} onToggle={() => toggle('about')}
          onRegenerate={() => handleRegenerate('about')} regenerating={regenerating.about} />
        {open.about && (
          <div className="p-4 pt-0 border-t border-gray-50 dark:border-gray-700">
            <Field label="Title" value={websiteData.about?.title} onChange={(v) => update('about.title', v)} />
            <Field label="Description" value={websiteData.about?.description} onChange={(v) => update('about.description', v)} multiline />
          </div>
        )}
      </div>

      {/* Services */}
      <div className={sectionClass}>
        <SectionHeader title="⚙️ Services" isOpen={open.services} onToggle={() => toggle('services')}
          onRegenerate={() => handleRegenerate('services')} regenerating={regenerating.services} />
        {open.services && (
          <div className="p-4 pt-0 border-t border-gray-50 dark:border-gray-700 space-y-3">
            {(websiteData.services || []).map((svc, i) => (
              <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl relative">
                <button onClick={() => removeArrayItem('services', i)} className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600">
                  <FiTrash2 size={12} />
                </button>
                <Field label={`Service ${i + 1} Icon`} value={svc.icon} onChange={(v) => updateArr('services', i, 'icon', v)} placeholder="🔧" />
                <Field label="Title" value={svc.title} onChange={(v) => updateArr('services', i, 'title', v)} />
                <Field label="Description" value={svc.description} onChange={(v) => updateArr('services', i, 'description', v)} multiline />
              </div>
            ))}
            <button onClick={() => addArrayItem('services', { title: 'New Service', description: '', icon: '⭐' })}
              className="w-full py-2 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 text-sm text-gray-400 hover:border-indigo-300 hover:text-indigo-500 flex items-center justify-center gap-1 transition-colors">
              <FiPlus size={14} /> Add Service
            </button>
          </div>
        )}
      </div>

      {/* FAQ */}
      <div className={sectionClass}>
        <SectionHeader title="❓ FAQ" isOpen={open.faq} onToggle={() => toggle('faq')}
          onRegenerate={() => handleRegenerate('faq')} regenerating={regenerating.faq} />
        {open.faq && (
          <div className="p-4 pt-0 border-t border-gray-50 dark:border-gray-700 space-y-3">
            {(websiteData.faq || []).map((f, i) => (
              <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl relative">
                <button onClick={() => removeArrayItem('faq', i)} className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600">
                  <FiTrash2 size={12} />
                </button>
                <Field label="Question" value={f.question} onChange={(v) => updateArr('faq', i, 'question', v)} />
                <Field label="Answer" value={f.answer} onChange={(v) => updateArr('faq', i, 'answer', v)} multiline />
              </div>
            ))}
            <button onClick={() => addArrayItem('faq', { question: 'New Question?', answer: '' })}
              className="w-full py-2 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 text-sm text-gray-400 hover:border-indigo-300 hover:text-indigo-500 flex items-center justify-center gap-1 transition-colors">
              <FiPlus size={14} /> Add FAQ
            </button>
          </div>
        )}
      </div>

      {/* Testimonials */}
      <div className={sectionClass}>
        <SectionHeader title="💬 Testimonials" isOpen={open.testimonials} onToggle={() => toggle('testimonials')}
          onRegenerate={() => handleRegenerate('testimonials')} regenerating={regenerating.testimonials} />
        {open.testimonials && (
          <div className="p-4 pt-0 border-t border-gray-50 dark:border-gray-700 space-y-3">
            {(websiteData.testimonials || []).map((t, i) => (
              <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl relative">
                <button onClick={() => removeArrayItem('testimonials', i)} className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600">
                  <FiTrash2 size={12} />
                </button>
                <Field label="Name" value={t.name} onChange={(v) => updateArr('testimonials', i, 'name', v)} />
                <Field label="Role/Title" value={t.role} onChange={(v) => updateArr('testimonials', i, 'role', v)} />
                <Field label="Testimonial" value={t.text} onChange={(v) => updateArr('testimonials', i, 'text', v)} multiline />
              </div>
            ))}
            <button onClick={() => addArrayItem('testimonials', { name: 'New Customer', role: 'Customer', text: '' })}
              className="w-full py-2 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 text-sm text-gray-400 hover:border-indigo-300 hover:text-indigo-500 flex items-center justify-center gap-1 transition-colors">
              <FiPlus size={14} /> Add Testimonial
            </button>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className={sectionClass}>
        <SectionHeader title="📣 Call to Action" isOpen={open.cta} onToggle={() => toggle('cta')}
          onRegenerate={() => handleRegenerate('cta')} regenerating={regenerating.cta} />
        {open.cta && (
          <div className="p-4 pt-0 border-t border-gray-50 dark:border-gray-700">
            <Field label="Title" value={websiteData.cta?.title} onChange={(v) => update('cta.title', v)} />
            <Field label="Description" value={websiteData.cta?.description} onChange={(v) => update('cta.description', v)} multiline />
            <Field label="Button Text" value={websiteData.cta?.buttonText} onChange={(v) => update('cta.buttonText', v)} />
          </div>
        )}
      </div>

      {/* Contact */}
      <div className={sectionClass}>
        <SectionHeader title="📬 Contact" isOpen={open.contact} onToggle={() => toggle('contact')} />
        {open.contact && (
          <div className="p-4 pt-0 border-t border-gray-50 dark:border-gray-700">
            <Field label="Title" value={websiteData.contact?.title} onChange={(v) => update('contact.title', v)} />
            <Field label="Email" value={websiteData.contact?.email} onChange={(v) => update('contact.email', v)} />
            <Field label="Phone" value={websiteData.contact?.phone} onChange={(v) => update('contact.phone', v)} />
            <Field label="Address" value={websiteData.contact?.address} onChange={(v) => update('contact.address', v)} />
          </div>
        )}
      </div>

      {/* SEO */}
      <div className={sectionClass}>
        <SectionHeader title="🔍 SEO" isOpen={open.seo} onToggle={() => toggle('seo')}
          onRegenerate={() => handleRegenerate('seo')} regenerating={regenerating.seo} />
        {open.seo && (
          <div className="p-4 pt-0 border-t border-gray-50 dark:border-gray-700">
            <Field label="Meta Title" value={websiteData.seo?.metaTitle} onChange={(v) => update('seo.metaTitle', v)} />
            <Field label="Meta Description" value={websiteData.seo?.metaDescription} onChange={(v) => update('seo.metaDescription', v)} multiline />
          </div>
        )}
      </div>

      {/* Colors */}
      <div className={sectionClass}>
        <SectionHeader title="🎨 Color Theme" isOpen={open.colors} onToggle={() => toggle('colors')} />
        {open.colors && (
          <div className="p-4 pt-0 border-t border-gray-50 dark:border-gray-700 grid grid-cols-3 gap-3">
            {['primary', 'secondary', 'accent'].map((c) => (
              <div key={c}>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 capitalize">{c}</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={websiteData.colorTheme?.[c] || '#4f46e5'}
                    onChange={(e) => update(`colorTheme.${c}`, e.target.value)}
                    className="w-9 h-9 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
                  <input type="text" value={websiteData.colorTheme?.[c] || '#4f46e5'}
                    onChange={(e) => update(`colorTheme.${c}`, e.target.value)}
                    className="input-field text-xs py-1.5 px-2 flex-1" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
