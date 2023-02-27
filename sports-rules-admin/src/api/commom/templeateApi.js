import axios from 'src/api/common/axioswarpper.js'

let prefix = process.env.API_PREFIX;
export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: {...params } })