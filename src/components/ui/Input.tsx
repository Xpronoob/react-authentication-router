import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <input
      ref={ref}
      className="block w-full rounded-md border-0 pl-1.5 py-1.5 text-gray-900 shadow-sm
      ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
      focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
      {...props}
    />
  )
})

Input.displayName = 'Input'

export default Input
