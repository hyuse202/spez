import { BE_URI } from "@/utils/constants";
import axios from "axios";
export default function usePost() {
  let token: any;
  if (typeof window !== "undefined") token = localStorage.getItem("jwt");
  console.log(token);
  const API = {
    all: BE_URI + "/posts",
    post: BE_URI + "/posts/",
    like: BE_URI + "/likes",
    comments: BE_URI + "/posts/cmt/",
  };
  async function getAllPost() {
    const data = await axios.get(API.all + "/?skip=10", {
      headers: {
        accept: "application/json",
      },
    });
    return data.data;
  }
  async function getPost(id: string) {
    const data = await axios.get(API.post + id, {
      headers: {
        accept: "application/json",
      },
    });
    return data.data;
  }
  async function getLike(id: string) {
    const data = await axios.get(API.like + "/post/" + id, {
      headers: {
        accept: "application/json",
      },
    });
    return data.data;
  }
  async function getComment(id: string) {
    const data = await axios.get(API.comments + id, {
      headers: {
        accept: "application/json",
      },
    });
    return data.data;
  }
  return {
    getAllPost,
    getPost,
    getLike,
    getComment,
  };
}
