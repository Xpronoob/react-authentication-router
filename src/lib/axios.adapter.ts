import axios from 'axios'
axios.defaults.withCredentials = true

const apiUrl = 'http://localhost:3030/api/auth'

export class AxiosAdapter {
  // static async getRequest(url: string, params: any) {}

  static async postRequest(url: string, body: any) {
    return axios.post(apiUrl + url, body)
  }
}

export default AxiosAdapter
