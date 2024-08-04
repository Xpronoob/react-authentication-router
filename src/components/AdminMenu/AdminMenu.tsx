import { Link } from 'react-router-dom'
import { adminMenuData, AdminMenuItem, ListItem } from '../../mocks/adminMenuData'

function AdminMenu() {
  return (
    <div className="flex flex-col bg-slate-100 h-screen">
      {adminMenuData.map((item: AdminMenuItem) => (
        <div className="" key={item.id}>
          <span className="font-bold pl-4">{item.title}</span>
          {item.listItems.map((listItem: ListItem) => (
            <Link to={listItem.url} key={listItem.id} className="flex pl-2 gap-1">
              <img src={listItem.icon} alt={`${listItem.title} icon`} />
              <span>{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

export default AdminMenu
