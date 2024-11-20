import axios from "axios"
import { BE_URI } from "@/utils/constants"
const API = {
    like: BE_URI + "/likes"
}
export const svLike = () => {
  async function postLike(id: string, token: string | null) {
     return await axios.post(API.like + "/" + id, {},{
      headers: {
        accept: "application/json",     
        Authorization: `Bearer ${token}`
      }
    }) 
  }
  async function delLike(id: string, token: string | null) {
     return await axios.delete(API.like + "/" + id, {
      headers: {
        // accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  }

  return {
    postLike,
    delLike,
  }
}
export const getLikes = async (id: string) => 
  await axios.get(API.like + "/post/" + id)
  .then((res) => res.data)