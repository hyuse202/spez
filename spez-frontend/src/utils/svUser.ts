import { BE_URI } from "@/utils/constants";
import axios from "axios";

export default function svUser() {
  const API = {
    usr: BE_URI + "/users/",
    // useprofile: BE_URI +
  };
  async function getUser(id: string) {
    const data = await axios.get(API.usr + id, {
      headers: {
        accept: "application/json",
      },
    });
    return data.data;
  }
  async function getUsrProfile(id: string) {
    const data = await axios.get(API.usr + id + "/profile", {
      headers: {
        accept: "application/json",
      },
    });
    return data.data;
  }
  async function updUsrProfile(id: string, token: string, imgBase64: string) {
    const data = await axios.put(
      API.usr + id + "/profile",
      {
        avatar: imgBase64,
        gender: "male",
        description: "iu nuoc khong phan dong",
      },
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  }
  return {
    getUser,
    getUsrProfile,
    updUsrProfile,
  };
}
