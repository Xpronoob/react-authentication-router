import { AdminRoutes } from '../models/routes'
export interface ListItem {
  id: number
  title: string
  url: string
  icon: string
}

export interface AdminMenuItem {
  id: number
  title: string
  listItems: ListItem[]
}

export const adminMenuData: AdminMenuItem[] = [
  {
    id: 1,
    title: 'Main',
    listItems: [
      {
        id: 1,
        title: 'Homepage',
        url: `/${AdminRoutes.ADMIN}`,
        icon: '/vite.svg',
      },
    ],
  },
  {
    id: 2,
    title: 'Manage',
    listItems: [
      {
        id: 1,
        title: 'Users',
        url: `/${AdminRoutes.ADMIN}/users`,
        icon: '/vite.svg',
      },
      {
        id: 2,
        title: 'Categories',
        url: `/${AdminRoutes.ADMIN}/categories`,
        icon: '/vite.svg',
      },
      {
        id: 3,
        title: 'Products',
        url: `/${AdminRoutes.ADMIN}/products`,
        icon: '/vite.svg',
      },
      {
        id: 4,
        title: 'Orders',
        url: `/${AdminRoutes.ADMIN}/orders`,
        icon: '/vite.svg',
      },
    ],
  },
  {
    id: 3,
    title: 'Others',
    listItems: [
      {
        id: 1,
        title: 'Location',
        url: `/${AdminRoutes.ADMIN}/location`,
        icon: '/vite.svg',
      },
      {
        id: 2,
        title: 'Settings',
        url: `/${AdminRoutes.ADMIN}/settings`,
        icon: '/vite.svg',
      },
      {
        id: 3,
        title: 'Pages',
        url: `/${AdminRoutes.ADMIN}/pages`,
        icon: '/vite.svg',
      },
      {
        id: 4,
        title: 'Support',
        url: `/${AdminRoutes.ADMIN}/support`,
        icon: '/vite.svg',
      },
    ],
  },
]
