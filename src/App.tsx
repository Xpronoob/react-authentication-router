import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { AdminRoutes, PrivateRoutes, PublicRoutes, Roles } from './models'
import { AuthGuard, RoleGuard } from './guards'
import { RoutesWithNotFound } from './utilities'
import { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import EditUser from './pages/Admin/Users/EditUser'

//PUBLIC
const Index = lazy(() => import('./pages/Public/Index/Index'))
const Login = lazy(() => import('./pages/Public/Login/Login'))
const Register = lazy(() => import('./pages/Public/Register/Register'))
//PRIVATE
const Private = lazy(() => import('./pages/Private/Private'))
//ADMIN
const IndexAdmin = lazy(() => import('./pages/Admin/Index'))
const Users = lazy(() => import('./pages/Admin/Users/Users'))

function App() {
  return (
    <Suspense fallback={<>Cargando</>}>
      <Provider store={store}>
        <BrowserRouter>
          <RoutesWithNotFound>
            {/* PUBLIC */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Index />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path={PublicRoutes.REGISTER} element={<Register />} />
            </Route>
            {/* AUTHENTICATED */}
            <Route element={<AuthGuard privateValidation={true} />}>
              <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
            </Route>
            {/* ROLE ADMIN */}
            {/* <Route element={<RoleGuard role={Roles.ADMIN} />}>
              <Route path={`${AdminRoutes.ADMIN}/*`} element={<IndexAdmin />} />
            </Route> */}
            {/* ROLE ADMIN USERS */}
            <Route element={<RoleGuard role={Roles.ADMIN} />}>
              <Route path={AdminRoutes.ADMIN} element={<AdminLayout />}>
                <Route index element={<IndexAdmin />} />
                <Route path={AdminRoutes.USERS} element={<Users />} />
                <Route path="/admin/users/:id" element={<EditUser />} />
                <Route path={`${AdminRoutes.ADMIN}/*`} element={<IndexAdmin />} />
              </Route>
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
      </Provider>
    </Suspense>
  )
}

export default App
