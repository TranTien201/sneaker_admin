import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:8080/'
})
export const url = 'http://localhost:8080/File/'; 
export const get = async (path, prams = {}) => {
    const response = await request.get(path, prams)
    return response
}
export const post = async (path, value) => {
    const response = await request.post(path, value)
    return response
}
export default request