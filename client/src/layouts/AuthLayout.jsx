import { Link } from 'react-router-dom'
import { FiZap } from 'react-icons/fi'

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <nav className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <FiZap className="text-white" size={14} />
          </div>
          <span className="font-display font-bold text-lg dark:text-white">SiteAI</span>
        </Link>
      </nav>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {title && (
            <div className="mb-8 text-center">
              <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
              {subtitle && <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
