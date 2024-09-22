import { useSelector } from 'react-redux'
import { PrivateRoutes, Roles } from '../models'
import { Navigate, Outlet } from 'react-router-dom'
import { AppStore } from '../redux/store'

interface Props {
  role?: Roles
  roles: string[]
}
function RoleGuard({ roles }: Props) {
  const userState = useSelector((store: AppStore) => store.user)
  if (!userState.roles) return <Navigate replace to={PrivateRoutes.PRIVATE} />
  return userState.roles.some(role => roles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate replace to={PrivateRoutes.PRIVATE} />
  )
}

export default RoleGuard
