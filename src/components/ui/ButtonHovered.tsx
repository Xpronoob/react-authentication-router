function ButtonHovered({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="text-gray-900 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      {...props}
    >
      {children}
    </button>
  )
}

export default ButtonHovered
