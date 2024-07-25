import { useSelector } from 'react-redux'
import { PrivateRoutes, Roles } from '../models'
import { Navigate, Outlet } from 'react-router-dom'
import { AppStore } from '../redux/store'

interface Props {
  role: Roles
}

function RoleGuard({ role }: Props) {
  const userState = useSelector((store: AppStore) => store.user)
  return userState.roles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate replace to={PrivateRoutes.PRIVATE} />
  )
}

export default RoleGuard
