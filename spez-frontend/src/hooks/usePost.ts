import { BE_URI } from "@/utils/constants"
import axios from 'axios'
export default function usePost() {
    let token:any
    if (typeof window !== 'undefined')
        token = localStorage.getItem('jwt')
    const API = {
        all: BE_URI + "/post"
    }
    async function getAllPost() {
        const data = await axios.get('http://localhost:8000/posts', 
            {
            headers: {
                accept: 'application/json',
                // 'Authorization': `Bearer ${token}`
            }
        }
    )
        return data.data;
    }
  return {
    getAllPost
  }
}