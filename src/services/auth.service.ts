import AxiosAdapter from '../lib/axios.adapter'

export const postLoginService = (email: string, password: string) => {
  return AxiosAdapter.postRequest('/login', { email, password })
}

export const postRegisterService = (name: string, email: string, password: string) => {
  return AxiosAdapter.postRequest('/register', { name, email, password })
}

export const postLogoutServices = () => {
  return AxiosAdapter.postRequest('/logout', {})
}
