const Spinner = ({className}: {className?: string}) => {
  return (
    <div className={`animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 z-40 ${className}`}></div>
  )
}

export default Spinner