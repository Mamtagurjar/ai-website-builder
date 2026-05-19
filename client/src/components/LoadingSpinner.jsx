export default function LoadingSpinner({ size = 'md', text = '' }) {
  const sizes = { sm: 'w-5 h-5 border-2', md: 'w-10 h-10 border-3', lg: 'w-16 h-16 border-4' }
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} border-indigo-600 border-t-transparent rounded-full animate-spin`} />
      {text && <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{text}</p>}
    </div>
  )
}
