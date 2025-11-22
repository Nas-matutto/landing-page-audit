export function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          {/* Logo - Talking Mouth Icon */}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg">
              {/* Outer mouth shape */}
              <path
                d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                fill="currentColor"
                opacity="0.2"
              />
              {/* Inner mouth/speech bubble */}
              <path
                d="M8 10C8 9.44772 8.44772 9 9 9H15C15.5523 9 16 9.44772 16 10V14C16 14.5523 15.5523 15 15 15H9L7 17V10Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Company Name */}
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Talk</span>
        </div>
      </div>
    </header>
  )
}
