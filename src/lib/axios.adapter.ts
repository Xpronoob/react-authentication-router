import axios from 'axios'
import { UserInfo } from '../models'
import { PostUser } from '../models/postUser.model'
axios.defaults.withCredentials = true

const apiUrl = 'http://localhost:3030/api'
const axiosInstance = axios.create({ baseURL: apiUrl })

export class AxiosAdapter {
  static async getRequest(url: string) {
    const response = await axios.get(apiUrl + url)
    return response.data
    // return axios.get(apiUrl + url, { params })
  }

  static async postRequest(url: string, body: any) {
    return await axios.post(apiUrl + url, body)
  }

  static async findAllUsersIds() {
    return (await axiosInstance.get<PostUser[]>('/admin/users')).data.map(user => user.id)
  }

  static async findUserById(id: string | undefined) {
    return (await axiosInstance.get<PostUser>(`/admin/users/${id}`)).data
  }

  static async createUser(user: PostUser) {
    return await axiosInstance.post('/admin/users', user)
  }

  static async updateUser(user: PostUser) {
    console.log(user)
    await axiosInstance.patch(`/admin/users/${user.id}`, user)
  }

  static async deleteUser(id: string) {
    await axiosInstance.delete(`/admin/users/${id}`)
  }
}

export default AxiosAdapter
