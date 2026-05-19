import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { FiZap, FiLayout, FiEdit3, FiDownload, FiMoon, FiSun } from 'react-icons/fi'

const features = [
  { icon: FiZap, title: 'AI-Powered Content', desc: 'Generate professional website copy, sections, and SEO content in seconds using Google Gemini AI.' },
  { icon: FiLayout, title: 'Live Preview', desc: 'See your website come to life instantly as you edit, with a real-time split-screen preview.' },
  { icon: FiEdit3, title: 'Easy Editing', desc: 'Customize every section, heading, and description through an intuitive inline editor.' },
  { icon: FiDownload, title: 'Export Anywhere', desc: 'Download your website as clean HTML, Markdown, or JSON for use anywhere.' },
]

export default function LandingPage() {
  const { user } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FiZap className="text-white" size={16} />
            </div>
            <span className="font-display font-bold text-xl">SiteAI</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            {user ? (
              <Link to="/dashboard" className="btn-primary text-sm">Go to Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm">Login</Link>
                <Link to="/signup" className="btn-primary text-sm">Get Started Free</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-28 md:py-40">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/40 dark:via-gray-950 dark:to-purple-950/30" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/40 dark:bg-indigo-800/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/40 dark:bg-purple-800/20 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="section-badge mb-6">
            <FiZap size={12} />
            Powered by Google Gemini AI
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            Build Your Website with{' '}
            <span className="gradient-text">AI in Seconds</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Enter your business details, and our AI generates a complete, professional website — hero, services, FAQ, testimonials, and more. Edit live, export anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary text-base px-8 py-3 inline-flex items-center gap-2">
              <FiZap size={18} /> Start Building Free
            </Link>
            <Link to="/login" className="btn-secondary text-base px-8 py-3">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">A complete AI website builder, fully yours.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 group hover:border-indigo-200 dark:hover:border-indigo-700">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60 transition-colors">
                  <Icon className="text-indigo-600 dark:text-indigo-400" size={22} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold mb-4">How it works</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-16">Three simple steps to your website</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Fill in your details', desc: 'Enter your business name, category, services, and a brief description.' },
              { step: '02', title: 'AI generates your site', desc: 'Our AI builds all your website sections — hero, about, services, FAQ, and more.' },
              { step: '03', title: 'Edit & export', desc: 'Customize every section in the live editor, then export your site.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-6xl font-display font-bold text-indigo-100 dark:text-indigo-900/60 mb-4">{step}</div>
                <h3 className="font-display text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="font-display text-4xl font-bold mb-4">Ready to build your website?</h2>
          <p className="text-indigo-200 mb-8 text-lg">Join thousands of businesses using SiteAI.</p>
          <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors">
            <FiZap size={18} /> Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
              <FiZap className="text-white" size={12} />
            </div>
            <span className="font-display font-bold">SiteAI</span>
          </div>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} SiteAI. Built with Google Gemini & MERN Stack.</p>
        </div>
      </footer>
    </div>
  )
}
