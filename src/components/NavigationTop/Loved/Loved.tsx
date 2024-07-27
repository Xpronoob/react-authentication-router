import { Heart } from 'lucide-react'
import { useState } from 'react'

function Loved() {
  const [isHover, setIsHover] = useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  return (
    <div
      id="mostrar"
      className=""
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Heart color="red" size={27} strokeWidth={1} />
      {isHover && <div className="absolute bg-red-500 rounded-sm p-1 text-sm">Loved</div>}
    </div>
  )
}

export default Loved
