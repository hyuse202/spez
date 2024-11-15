import { BE_URI } from "@/utils/constants";
import axios from "axios";
const API = {
  all: BE_URI + "/posts",
  post: BE_URI + "/posts/",
};
export const svPost = () => {
  async function createPost(
    title: string,
    content: string,
    token: string | null
  ) {
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
    getPost,
    delPost,
    createPost,
  };
};
export const createPost = async (
  title: string,
  content: string,
  token: string | null
) => {
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
};
export const getPost = async (id: string) =>
  await axios.get(API.post + id).then((res) => res.data);

export const getAllPost = async () =>
  await axios.get(API.all + "/?skip=10").then((res) => res.data);
