import axios from "axios"
import { BE_URI } from "@/utils/constants"
export default function svLike(){
    const API = {
        like: BE_URI + "/likes"
    }
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

  async function getLike(id: string) {
    const data = await axios.get(API.like + "/post/" + id, {
      headers: {
        accept: "application/json",
      },
    });
    return data.data;
  }
  return {
    postLike,
    delLike,
    getLike,
  }
}