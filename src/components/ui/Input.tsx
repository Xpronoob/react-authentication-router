interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input(props: Props) {
  return (
    <input
      className="block w-full rounded-md border-0 pl-1.5 py-1.5 text-gray-900 shadow-sm
    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
    focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
      {...props}
    />
  )
}

export default Input
