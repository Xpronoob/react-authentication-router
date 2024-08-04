import { Link } from 'react-router-dom'
import { adminMenuData } from '../../mocks/adminMenuData'

function AdminMenu() {
  return (
    <div className="flex flex-col bg-slate-100 h-screen">
      {adminMenuData.map(subtitle => (
        <div className="" key={subtitle.id}>
          <span className="font-bold pl-4">{subtitle.title}</span>
          {subtitle.listItems.map(item => (
            <Link to={item.url} key={item.id} className="flex pl-2 gap-1">
              <img src={item.icon} alt={`${item.title} icon`} />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
  // return (
  //   <div>
  //     {adminMenuData.map(subtitle => (
  //       <div key={subtitle.id}>
  //         <span>{subtitle.title}</span>
  //         {subtitle.listItems.map(item => (
  //           <Link to={item.url} key={item.id}>
  //             <span>{item.title}</span>
  //           </Link>
  //         ))}
  //       </div>
  //     ))}
  //   </div>
  // )
}

export default AdminMenu
