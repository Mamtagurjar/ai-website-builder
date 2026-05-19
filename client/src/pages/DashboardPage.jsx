import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { projectService } from '../services/projectService'
import { formatDate, truncate } from '../utils/helpers'
import toast from 'react-hot-toast'
import {
  FiZap, FiPlus, FiSearch, FiEdit2, FiTrash2, FiLogOut,
  FiMoon, FiSun, FiGrid, FiCalendar, FiFolder, FiX,
} from 'react-icons/fi'

const categoryColors = {
  Technology: 'bg-blue-100 text-blue-700',
  Healthcare: 'bg-green-100 text-green-700',
  Education: 'bg-yellow-100 text-yellow-700',
  Finance: 'bg-emerald-100 text-emerald-700',
  Default: 'bg-indigo-100 text-indigo-700',
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showNewModal, setShowNewModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    try {
      const { data } = await projectService.getAll()
      setProjects(data)
    } catch {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newName.trim()) return toast.error('Enter a project name')
    setCreating(true)
    try {
      const { data } = await projectService.create({ projectName: newName.trim() })
      toast.success('Project created!')
      navigate(`/editor/${data._id}`)
    } catch {
      toast.error('Failed to create project')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await projectService.delete(id)
      setProjects((p) => p.filter((proj) => proj._id !== id))
      toast.success('Project deleted')
      setDeleteId(null)
    } catch {
      toast.error('Failed to delete project')
    }
  }

  const filtered = projects.filter(
    (p) =>
      p.projectName?.toLowerCase().includes(search.toLowerCase()) ||
      p.businessName?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FiZap className="text-white" size={16} />
            </div>
            <span className="font-display font-bold text-xl dark:text-white">SiteAI</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">{user?.name}</span>
            </div>
            <button onClick={logout} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
              <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">My Projects</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={() => setShowNewModal(true)} className="btn-primary flex items-center gap-2 text-sm">
            <FiPlus size={16} /> New Project
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text" placeholder="Search projects..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10 text-sm"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-3" />
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-1/2 mb-6" />
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-full mb-2" />
                <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-lg w-full mt-4" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-4">
              <FiFolder className="text-indigo-400" size={28} />
            </div>
            <h3 className="font-display text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              {search ? 'No projects found' : 'No projects yet'}
            </h3>
            <p className="text-gray-400 mb-6 text-sm">
              {search ? 'Try a different search' : 'Create your first AI-generated website'}
            </p>
            {!search && (
              <button onClick={() => setShowNewModal(true)} className="btn-primary flex items-center gap-2 text-sm">
                <FiPlus size={16} /> Create First Project
              </button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((proj) => (
              <div key={proj._id} className="card p-6 group flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {proj.projectName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to={`/editor/${proj._id}`} className="p-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-gray-500 hover:text-indigo-600 transition-colors">
                      <FiEdit2 size={15} />
                    </Link>
                    <button onClick={() => setDeleteId(proj._id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-600 transition-colors">
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </div>

                <h3 className="font-display font-semibold text-gray-900 dark:text-white text-lg leading-tight mb-1">{proj.projectName}</h3>
                {proj.businessName && <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{proj.businessName}</p>}

                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-50 dark:border-gray-700/50">
                  {proj.category && (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[proj.category] || categoryColors.Default}`}>
                      {proj.category}
                    </span>
                  )}
                  <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                    <FiCalendar size={11} /> {formatDate(proj.updatedAt)}
                  </span>
                </div>

                <Link to={`/editor/${proj._id}`} className="mt-3 btn-secondary w-full text-sm text-center flex items-center justify-center gap-2">
                  <FiEdit2 size={14} /> Open Editor
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* New Project Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-bold dark:text-white">New Project</h2>
              <button onClick={() => setShowNewModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                <FiX size={18} />
              </button>
            </div>
            <form onSubmit={handleCreate}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Project Name</label>
              <input
                type="text" placeholder="e.g. My Restaurant Website"
                value={newName} onChange={(e) => setNewName(e.target.value)}
                className="input-field mb-5" autoFocus
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowNewModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={creating} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  {creating ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FiPlus size={16} />}
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-slide-up">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <FiTrash2 className="text-red-600" size={22} />
            </div>
            <h2 className="font-display text-lg font-bold text-center dark:text-white mb-2">Delete Project?</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="btn-danger flex-1">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
