import { useState } from 'react'
import { categoryOptions, toneOptions, colorThemeOptions } from '../utils/helpers'
import { FiChevronRight, FiChevronLeft, FiZap } from 'react-icons/fi'

const STEPS = ['Business Info', 'Details & Style', 'Contact']

export default function BusinessForm({ onGenerate, loading, initialData = {} }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    businessName: initialData.businessName || '',
    category: initialData.category || '',
    services: initialData.businessInfo?.services || '',
    targetAudience: initialData.businessInfo?.targetAudience || '',
    description: initialData.businessInfo?.description || '',
    tone: initialData.businessInfo?.tone || 'Professional',
    colorTheme: initialData.businessInfo?.colorTheme || 'blue and white, professional',
    contactEmail: initialData.businessInfo?.contactEmail || '',
    contactPhone: initialData.businessInfo?.contactPhone || '',
    address: initialData.businessInfo?.address || '',
  })
  const [errors, setErrors] = useState({})

  const update = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }))
    setErrors((p) => ({ ...p, [k]: '' }))
  }

  const validateStep = () => {
    const e = {}
    if (step === 0) {
      if (!form.businessName.trim()) e.businessName = 'Business name is required'
      if (!form.category) e.category = 'Category is required'
    }
    if (step === 1) {
      if (!form.description.trim()) e.description = 'Description is required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (validateStep()) setStep((s) => s + 1) }
  const prev = () => setStep((s) => s - 1)

  const handleSubmit = () => {
    if (!validateStep()) return
    onGenerate({
      businessName: form.businessName,
      category: form.category,
      services: form.services,
      targetAudience: form.targetAudience,
      description: form.description,
      tone: form.tone,
      colorTheme: form.colorTheme,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      address: form.address,
    })
  }

  const fieldClass = (k) =>
    `input-field ${errors[k] ? 'border-red-400 focus:ring-red-400' : ''}`

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < step ? 'bg-indigo-600 text-white' :
              i === step ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-600 ring-offset-1' :
              'bg-gray-100 dark:bg-gray-700 text-gray-400'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-indigo-700 dark:text-indigo-400' : 'text-gray-400'}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 rounded ${i < step ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
          </div>
        ))}
      </div>

      {/* Step 0 */}
      {step === 0 && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Business Name *</label>
            <input type="text" placeholder="e.g. Green Valley Dental" value={form.businessName}
              onChange={(e) => update('businessName', e.target.value)} className={fieldClass('businessName')} />
            {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Industry / Category *</label>
            <select value={form.category} onChange={(e) => update('category', e.target.value)} className={fieldClass('category')}>
              <option value="">Select a category...</option>
              {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Services Offered</label>
            <textarea rows={3} placeholder="e.g. General dentistry, teeth whitening, orthodontics, emergency care..."
              value={form.services} onChange={(e) => update('services', e.target.value)}
              className={fieldClass('services')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Target Audience</label>
            <input type="text" placeholder="e.g. Families and professionals in urban areas"
              value={form.targetAudience} onChange={(e) => update('targetAudience', e.target.value)}
              className={fieldClass('targetAudience')} />
          </div>
        </div>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Business Description *</label>
            <textarea rows={4} placeholder="Tell us about your business — what makes you unique, your mission, years in business..."
              value={form.description} onChange={(e) => update('description', e.target.value)}
              className={fieldClass('description')} />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tone / Style</label>
            <div className="grid grid-cols-2 gap-2">
              {toneOptions.map((t) => (
                <button key={t} type="button" onClick={() => update('tone', t)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                    form.tone === t
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Color Theme</label>
            <div className="grid grid-cols-2 gap-2">
              {colorThemeOptions.map(({ label, value }) => (
                <button key={value} type="button" onClick={() => update('colorTheme', value)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                    form.colorTheme === value
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Contact Email</label>
            <input type="email" placeholder="hello@yourbusiness.com"
              value={form.contactEmail} onChange={(e) => update('contactEmail', e.target.value)} className={fieldClass('contactEmail')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
            <input type="tel" placeholder="+1 (555) 000-0000"
              value={form.contactPhone} onChange={(e) => update('contactPhone', e.target.value)} className={fieldClass('contactPhone')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Business Address</label>
            <input type="text" placeholder="123 Main St, City, State 12345"
              value={form.address} onChange={(e) => update('address', e.target.value)} className={fieldClass('address')} />
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
            <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">🤖 Ready to generate!</p>
            <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-1">
              AI will create: Hero, About, Services, FAQ, Testimonials, CTA, Contact, and SEO content for <strong>{form.businessName}</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        {step > 0 && (
          <button onClick={prev} className="btn-secondary flex items-center gap-2 text-sm">
            <FiChevronLeft size={16} /> Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button onClick={next} className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm">
            Next <FiChevronRight size={16} />
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm">
            {loading ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Generating...</>
            ) : (
              <><FiZap size={16} /> Generate Website</>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
