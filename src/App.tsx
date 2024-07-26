import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { AdminRoutes, AdminUserRoutes, PrivateRoutes, PublicRoutes, Roles } from './models'
import { AuthGuard, RoleGuard } from './guards'
import { RoutesWithNotFound } from './utilities'
import { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import Users from './pages/Admin/Users/Users'
import Navigation from './components/ui/Navigation'

// import Index from './pages/Public/Index/Index'
const Index = lazy(() => import('./pages/Public/Index/Index'))
const Login = lazy(() => import('./pages/Public/Login/Login'))
const Register = lazy(() => import('./pages/Public/Register/Register'))
const Private = lazy(() => import('./pages/Private/Private'))

function App() {
  return (
    <div className="App bg-gray-50 dark:bg-slate-900 min-h-screen text-gray-900 dark:text-gray-200">
      <Suspense fallback={<>Cargando</>}>
        <Provider store={store}>
          <BrowserRouter>
            <Navigation />
            <RoutesWithNotFound>
              <Route path="/" element={<Index />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path={PublicRoutes.REGISTER} element={<Register />} />

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
    </div>
  )
}

export default App
