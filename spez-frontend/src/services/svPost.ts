import { BE_URI } from "@/utils/constants";
import axios from "axios";
import { headers } from "next/headers";
export default function svPost() {
  const API = {
    all: BE_URI + "/posts",
    post: BE_URI + "/posts/",
  };
  async function createPost(title: string, content: string, token: string | null) {
    await axios.post(
      API.post,
      {
        title: title,
        content: content,
      },
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
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
  async function delPost(id: string, token: string | null) {
    const data = await axios.delete(API.post + id, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  }
  return {
    getAllPost,
    getPost,
    delPost,
    createPost
  };
}
