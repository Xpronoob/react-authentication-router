import { Bell, LayoutGrid, Maximize, Search, Settings } from 'lucide-react'
import logo2 from '/logo2.png'
import userlogo from '/userlogo.png'

function AdminNavbar() {
  return (
    <div className="flex justify-between px-2 items-center p-2 bg-slate-300 dark:bg-slate-800">
      <div className="flex">
        <img src={logo2} alt="logo" className="w-7 h-7"></img>
        <span>Ecommerce</span>
      </div>
      <div className="flex">
        <div className="flex gap-3">
          <Search />
          <LayoutGrid />
          <Maximize />
          <div className="div flex">
            <Bell />
            {/* <span className="">1</span> */}
          </div>
        </div>

        <div className="flex gap-1 mx-4">
          <img src={userlogo} alt="profile image" className="w-7 h-7"></img>
          <span>User</span>
        </div>

        <div className="flex">
          <Settings />
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar
