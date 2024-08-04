import { Outlet } from 'react-router-dom'
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import AdminFooter from '../../components/AdminFooter/AdminFooter'

function AdminLayout() {
  return (
    <div className="flex-col">
      <AdminNavbar />
      <main className="flex">
        <div className="hidden sm:block sm:w-2/12">
          <AdminMenu />
        </div>
        <div className="w-full sm:w-10/12">
          <Outlet />
        </div>
      </main>
      <AdminFooter />
    </div>
  )
}

export default AdminLayout
