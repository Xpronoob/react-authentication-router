import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { AdminRoutes, AdminUserRoutes, PrivateRoutes, PublicRoutes, Roles } from './models'
import { AuthGuard, RoleGuard } from './guards'
import { RoutesWithNotFound } from './utilities'
import { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import Users from './pages/Admin/Users/Users'
import PublicLayout from './layouts/PublicLayout'

// import Index from './pages/Public/Index/Index'
const Index = lazy(() => import('./pages/Public/Index/Index'))
const Login = lazy(() => import('./pages/Public/Login/Login'))
const Register = lazy(() => import('./pages/Public/Register/Register'))
const Private = lazy(() => import('./pages/Private/Private'))

function App() {
  return (
    <Suspense fallback={<>Cargando</>}>
      <Provider store={store}>
        <BrowserRouter>
          <RoutesWithNotFound>
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Index />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path={PublicRoutes.REGISTER} element={<Register />} />
            </Route>

            <Route element={<AuthGuard privateValidation={true} />}>
              <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
            </Route>

            <Route element={<RoleGuard role={Roles.ADMIN} />}>
              <Route path={`${AdminRoutes.ADMIN}/*`} element={<Users />} />
            </Route>

            <Route element={<RoleGuard role={Roles.ADMIN_USER} />}>
              <Route path={`${AdminUserRoutes.USERS}/*`} element={<Users />} />
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
      </Provider>
    </Suspense>
  )
}

export default App
