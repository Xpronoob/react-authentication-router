import AxiosAdapter from '../lib/axios.adapter'

export const postLogin = (email: string, password: string) => {
  return AxiosAdapter.postRequestLogin('/login', { email, password })
}
