// import axios from "axios";
import { BE_URI } from "@/utils/constants";

export default function svAuth() {
  const API = {
    token: BE_URI + "/token",
  };
  async function authenticate(body: string) {
    const data = await fetch(API.token,{
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: body
      })
    return data
  }
  return {
    authenticate
  }
}
