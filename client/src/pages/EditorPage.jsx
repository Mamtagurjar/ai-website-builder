import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { projectService } from '../services/projectService'
import { aiService } from '../services/aiService'
import { useTheme } from '../context/ThemeContext'
import BusinessForm from '../components/BusinessForm'
import WebsiteEditor from '../components/WebsiteEditor'
import WebsitePreview from '../components/WebsitePreview'
import ExportModal from '../components/ExportModal'
import toast from 'react-hot-toast'
import {
  FiZap, FiSave, FiDownload, FiArrowLeft, FiEye,
  FiEdit3, FiMoon, FiSun, FiRefreshCw, FiMonitor, FiSmartphone,
} from 'react-icons/fi'

const TABS = [
  { id: 'form', label: 'Business Info', icon: FiEdit3 },
  { id: 'editor', label: 'Edit Content', icon: FiRefreshCw },
]

export default function EditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()

  const [project, setProject] = useState(null)
  const [websiteData, setWebsiteData] = useState(null)
  const [businessData, setBusinessData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [activeTab, setActiveTab] = useState('form')
  const [previewMode, setPreviewMode] = useState('desktop')
  const [showPreview, setShowPreview] = useState(false) // mobile

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    try {
      const { data } = await projectService.getById(id)
      setProject(data)
      if (data.websiteData && Object.keys(data.websiteData).length > 0) {
        setWebsiteData(data.websiteData)
        setActiveTab('editor')
      }
      if (data.businessInfo) {
        setBusinessData({
          businessName: data.businessName,
          category: data.category,
          ...data.businessInfo,
        })
      }
    } catch {
      toast.error('Failed to load project')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async (formData) => {
    setGenerating(true)
    try {
      const { data } = await aiService.generate(formData)
      setWebsiteData(data.websiteData)
      setBusinessData(formData)

      // Auto-save with new data
      await projectService.update(id, {
        businessName: formData.businessName,
        category: formData.category,
        businessInfo: {
          services: formData.services,
          targetAudience: formData.targetAudience,
          description: formData.description,
          tone: formData.tone,
          colorTheme: formData.colorTheme,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone,
          address: formData.address,
        },
        websiteData: data.websiteData,
      })

      setProject((p) => ({
        ...p,
        businessName: formData.businessName,
        category: formData.category,
        websiteData: data.websiteData,
      }))

      toast.success('🎉 Website generated successfully!')
      setActiveTab('editor')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Generation failed. Check your Gemini API key.')
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = useCallback(async () => {
    if (!websiteData) return toast.error('Nothing to save yet')
    setSaving(true)
    try {
      await projectService.update(id, {
        websiteData,
        businessName: businessData?.businessName || project?.businessName,
        category: businessData?.category || project?.category,
      })
      toast.success('Project saved!')
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }, [websiteData, businessData, id, project])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading project...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors shrink-0">
              <FiArrowLeft size={18} />
            </Link>
            <div className="min-w-0">
              <h1 className="font-display font-bold text-sm text-gray-900 dark:text-white truncate">
                {project?.projectName || 'Untitled Project'}
              </h1>
              {project?.businessName && (
                <p className="text-xs text-gray-400 truncate">{project.businessName}</p>
              )}
            </div>
          </div>

          {/* Center tabs */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            {TABS.map(({ id: tid, label, icon: Icon }) => (
              <button
                key={tid}
                onClick={() => setActiveTab(tid)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tid
                    ? 'bg-white dark:bg-gray-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                }`}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors hidden sm:block">
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
            <button
              onClick={() => setShowPreview(p => !p)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
            >
              <FiEye size={16} />
            </button>
            {websiteData && (
              <button onClick={() => setShowExport(true)} className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5 hidden sm:flex">
                <FiDownload size={14} /> Export
              </button>
            )}
            <button onClick={handleSave} disabled={saving || !websiteData} className="btn-primary text-xs px-3 py-2 flex items-center gap-1.5">
              {saving ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FiSave size={14} />}
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mt-3">
          {TABS.map(({ id: tid, label, icon: Icon }) => (
            <button
              key={tid}
              onClick={() => setActiveTab(tid)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tid
                  ? 'bg-white dark:bg-gray-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL — Editor */}
        <div className={`w-full lg:w-[420px] xl:w-[480px] flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 overflow-y-auto flex flex-col ${showPreview ? 'hidden' : 'flex'} lg:flex`}>
          <div className="p-5 flex-1">
            {/* Generating overlay */}
            {generating && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative mb-6">
                  <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 rounded-full" />
                  <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute inset-0" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FiZap className="text-indigo-600" size={20} />
                  </div>
                </div>
                <h3 className="font-display font-bold text-gray-800 dark:text-white text-lg mb-2">Generating with AI...</h3>
                <p className="text-gray-400 text-sm text-center max-w-xs">
                  Google Gemini is creating your website content. This takes about 10–20 seconds.
                </p>
                <div className="mt-6 flex gap-1.5">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Business Form Tab */}
            {!generating && activeTab === 'form' && (
              <div className="animate-fade-in">
                <div className="mb-5">
                  <h2 className="font-display font-bold text-gray-900 dark:text-white text-lg">Business Information</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Fill in your details and generate your website</p>
                </div>
                <BusinessForm
                  onGenerate={handleGenerate}
                  loading={generating}
                  initialData={{
                    businessName: project?.businessName,
                    category: project?.category,
                    businessInfo: project?.businessInfo,
                  }}
                />
              </div>
            )}

            {/* Editor Tab */}
            {!generating && activeTab === 'editor' && (
              <div className="animate-fade-in">
                <div className="mb-5">
                  <h2 className="font-display font-bold text-gray-900 dark:text-white text-lg">Edit Content</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Customize each section. Click <FiRefreshCw className="inline" size={11} /> to regenerate with AI.
                  </p>
                </div>
                {websiteData ? (
                  <WebsiteEditor
                    websiteData={websiteData}
                    onChange={setWebsiteData}
                    businessData={businessData}
                  />
                ) : (
                  <div className="text-center py-16">
                    <div className="text-4xl mb-4">🎨</div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">No content yet. Generate your website first.</p>
                    <button onClick={() => setActiveTab('form')} className="btn-primary text-sm flex items-center gap-2 mx-auto">
                      <FiZap size={14} /> Go to Business Form
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL — Preview */}
        <div className={`flex-1 flex flex-col bg-gray-100 dark:bg-gray-800 overflow-hidden ${!showPreview ? 'hidden' : 'flex'} lg:flex`}>
          {/* Preview toolbar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shrink-0">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-400 rounded-full" />
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              <div className="w-3 h-3 bg-green-400 rounded-full" />
            </div>
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`p-1.5 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <FiMonitor size={13} />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`p-1.5 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <FiSmartphone size={13} />
              </button>
            </div>
            <span className="text-xs text-gray-400 font-medium">Live Preview</span>
          </div>

          {/* Preview area */}
          <div className="flex-1 overflow-y-auto p-4 flex justify-center">
            <div className={`transition-all duration-300 bg-white shadow-xl rounded-xl overflow-hidden ${
              previewMode === 'mobile' ? 'w-[375px]' : 'w-full max-w-4xl'
            }`}>
              <WebsitePreview
                websiteData={websiteData}
                businessName={project?.businessName || 'Your Business'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExport && (
        <ExportModal
          onClose={() => setShowExport(false)}
          websiteData={websiteData}
          businessName={project?.businessName}
          colorTheme={websiteData?.colorTheme}
        />
      )}
    </div>
  )
}
