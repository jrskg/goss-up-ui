import { AlertTriangle } from "lucide-react"
import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-36 md:pt-0 md:h-screen bg-gray-100 text-gray-800 dark:bg-dark-1 dark:text-gray-200 transition-all">
      <AlertTriangle className="text-warning w-16 h-16 mb-4" />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors" to="/">Go Back Home</Link>
    </div>
  )
}

export default ErrorPage