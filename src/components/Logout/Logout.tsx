import { useNavigate } from 'react-router-dom'
import { PublicRoutes } from '../../models'
import { resetUser, UserKey } from '../../redux/states/user'
import { clearLocalStorage } from '../../utilities'
import { useDispatch } from 'react-redux'
import { postLogoutServices } from '../../services'

function Logout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logOut = () => {
    clearLocalStorage(UserKey)
    //@ts-ignore
    dispatch(resetUser())
    try {
      postLogoutServices()
    } catch (error) {}
    navigate(PublicRoutes.LOGIN, { replace: true })
  }
  return (
    <button className="dark:text-white" onClick={logOut}>
      Log Out
    </button>
  )
}
export default Logout
