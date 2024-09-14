import AxiosAdapter from '../lib/axios.adapter'

export const postLoginService = (email: string, password: string) => {
  return AxiosAdapter.postRequest('/auth/login', { email, password })
}

export const postRegisterService = (name: string, email: string, password: string) => {
  return AxiosAdapter.postRequest('/auth/register', { name, email, password })
}

export const postLogoutServices = () => {
  return AxiosAdapter.postRequest('/auth/logout', {})
}
