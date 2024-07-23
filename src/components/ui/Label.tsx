interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

function Label({ children, ...props }: Props) {
  return (
    <label className="block text-md font-medium leading-6 text-gray-200" {...props}>
      {children}
    </label>
  )
}

export default Label
