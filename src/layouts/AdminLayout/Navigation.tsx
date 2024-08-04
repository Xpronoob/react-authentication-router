import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppStore } from '../../redux/store'
import { useState } from 'react'
import { useDarkMode } from '../../hooks/useDarkMode'
import { Moon, Sun } from 'lucide-react'

function Navigation() {
  const userState = useSelector((store: AppStore) => store.user)

  const [isOpen, setIsOpen] = useState(false)
  const [theme, toggleTheme] = useDarkMode()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <aside className="flex flex-col w-2/12 bg-slate-300 dark:bg-slate-900 dark:text-gray-200">
      <Link to="/">Link1</Link>
      <Link to="/">Link1</Link>
      <Link to="/">Link1</Link>
      <Link to="/">Link1</Link>
      <button onClick={toggleTheme}>
        {theme === 'dark' ? (
          <Moon color="white" size={29} strokeWidth={1} />
        ) : (
          <Sun color="black" size={29} strokeWidth={1} />
        )}
      </button>
    </aside>
  )
}

export default Navigation
