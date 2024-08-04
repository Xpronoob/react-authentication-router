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
    title: 'Title',
    listItems: [
      {
        id: 1,
        title: 'Link',
        url: '/',
        icon: '/vite.svg',
      },
      {
        id: 2,
        title: 'Link',
        url: '/',
        icon: '/vite.svg',
      },
    ],
  },
  {
    id: 2,
    title: 'Title',
    listItems: [
      {
        id: 1,
        title: 'Link',
        url: '/',
        icon: '/vite.svg',
      },
      {
        id: 2,
        title: 'Link',
        url: '/',
        icon: '/vite.svg',
      },
    ],
  },
]
