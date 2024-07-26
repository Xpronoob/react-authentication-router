import { Link } from 'react-router-dom'
import { AppStore } from '../../redux/store'
import { useSelector } from 'react-redux'
import { PublicRoutes } from '../../models'
import { useState } from 'react'
import Button from './Button'
import { Logout } from '../Logout'
import { useDarkMode } from '../../hooks/useDarkMode'
import logo from '../../../public/logo.png'

function Navigation() {
  const userState = useSelector((store: AppStore) => store.user)

  const [isOpen, setIsOpen] = useState(false)
  const [theme, toggleTheme] = useDarkMode()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const login = (
    <Link
      to={PublicRoutes.LOGIN}
      className="text-gray-900 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      ACCOUNT
    </Link>
  )
  // const register = <Link to={PublicRoutes.REGISTER}>REGISTER</Link>

  return (
    <nav className="bg-gray-100 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile Button */}
          <div className="absolute inset-y-0 left-0 sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              {isOpen ? '⚌' : '☰️'}
            </button>
          </div>

          {/* DESKTOP MENU */}
          <div className="flex-1 flex items-center justify-around">
            <div className="flex-shrink-0">
              <Link to="/">
                <img className="h-9 w-auto" src={logo} alt="Logo" />
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="#"
                  className="text-gray-900 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Categories
                </Link>
                <Link
                  to="#"
                  className="text-gray-900 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Category #1
                </Link>
                <Link
                  to="#"
                  className="text-gray-900 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Category #2
                </Link>
                <Link
                  to="#"
                  className="text-gray-900 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Category #3
                </Link>
              </div>
            </div>
            <div className="hidden gap-2 sm:flex">
              {userState?.id ? <Logout /> : login}
              <Button onClick={toggleTheme}>{theme === 'dark' ? '🌙' : '🌞'}</Button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Categories
          </Link>
          <Link
            to="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Category #1
          </Link>
          <Link
            to="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Category #2
          </Link>
          <Link
            to="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Category #3
          </Link>
          {userState?.id ? <Logout /> : login}
          <Button onClick={toggleTheme}>{theme === 'dark' ? '🌙' : '🌞'}</Button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
