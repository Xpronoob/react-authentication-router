import { useDispatch } from "react-redux"
import { getMorty } from "../../services"
import { createUser, resetUser, UserKey } from "../../redux/states/user"
import { useNavigate } from "react-router-dom"
import { PrivateRoutes, PublicRoutes } from "../../models"
import { useEffect } from "react"
import { clearLocalStorage } from "../../utilities"

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    clearLocalStorage(UserKey)
    dispatch(resetUser())
    navigate(`/${PublicRoutes.LOGIN}`, {replace: true})
  }, [])

  const login = async () => {
    try {
      const result = await getMorty()
      // dispatch(createUser({...result, rol: Roles.USER}))
      dispatch(createUser(result))
      navigate(`/${PrivateRoutes.PRIVATE}`, {replace: true})
    } catch (error) {}
  }

  return (
    <div>
      <h2>LOGIN!</h2>
      <button onClick={login}>LOGIN</button>
    </div>
  )
}
export default Login