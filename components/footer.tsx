export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">Talk</span>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Talk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
