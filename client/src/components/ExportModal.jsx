import { useState } from 'react'
import { generateHTML, generateMarkdown } from '../utils/helpers'
import { FiX, FiDownload, FiCode, FiFileText, FiDatabase } from 'react-icons/fi'
import toast from 'react-hot-toast'

const formats = [
  { id: 'html', label: 'HTML', icon: FiCode, desc: 'Complete HTML page ready to deploy', color: 'orange' },
  { id: 'json', label: 'JSON', icon: FiDatabase, desc: 'Structured JSON data for developers', color: 'blue' },
  { id: 'markdown', label: 'Markdown', icon: FiFileText, desc: 'Markdown format for easy editing', color: 'green' },
]

export default function ExportModal({ onClose, websiteData, businessName, colorTheme }) {
  const [selected, setSelected] = useState('html')

  const download = (content, filename, type) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    toast.success(`${filename} downloaded!`)
  }

  const handleExport = () => {
    const safe = businessName?.replace(/\s+/g, '-').toLowerCase() || 'website'
    if (selected === 'html') {
      download(generateHTML(websiteData, businessName, colorTheme), `${safe}.html`, 'text/html')
    } else if (selected === 'json') {
      download(JSON.stringify(websiteData, null, 2), `${safe}.json`, 'application/json')
    } else {
      download(generateMarkdown(websiteData, businessName), `${safe}.md`, 'text/markdown')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl font-bold dark:text-white">Export Website</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Download your content in any format</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
            <FiX size={18} />
          </button>
        </div>

        <div className="space-y-2 mb-6">
          {formats.map(({ id, label, icon: Icon, desc, color }) => (
            <button
              key={id}
              onClick={() => setSelected(id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                selected === id
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                selected === id ? 'bg-indigo-100 dark:bg-indigo-900/40' : 'bg-gray-100 dark:bg-gray-800'
              }`}>
                <Icon className={selected === id ? 'text-indigo-600' : 'text-gray-500'} size={18} />
              </div>
              <div>
                <p className={`font-semibold text-sm ${selected === id ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-800 dark:text-gray-200'}`}>{label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
              {selected === id && <div className="ml-auto w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs">✓</div>}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
          <button onClick={handleExport} className="btn-primary flex-1 flex items-center justify-center gap-2">
            <FiDownload size={16} /> Download
          </button>
        </div>
      </div>
    </div>
  )
}
