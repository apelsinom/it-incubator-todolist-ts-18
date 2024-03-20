import axios from "axios"
export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "1b9bc2ff-37c7-4083-9ab4-b71c1c113dfa",
  },
})
