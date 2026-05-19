import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { FiZap, FiMoon, FiSun, FiLogOut } from 'react-icons/fi'

export default function Navbar({ showUser = true }) {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <FiZap className="text-white" size={16} />
          </div>
          <span className="font-display font-bold text-xl dark:text-white">SiteAI</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {showUser && user ? (
            <>
              <Link to="/dashboard" className="btn-secondary text-sm hidden sm:inline-flex">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-500 transition-colors"
              >
                <FiLogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary text-sm">Login</Link>
              <Link to="/signup" className="btn-primary text-sm">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
