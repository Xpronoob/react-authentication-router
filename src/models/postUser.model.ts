import { Roles } from './roles'

export interface PostUser {
  id?: string
  name?: string
  email?: string
  password?: string
  roles?: Roles[]
  img?: string
  checked?: boolean
}
