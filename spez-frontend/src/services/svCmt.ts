import axios from "axios";
import { BE_URI } from "@/utils/constants";
const API = {
  comments: BE_URI + "/posts/cmt/",
};
export const svCmt = () => {
  async function getComment(id: string) {
    const data = await axios.get(API.comments + id, {
      headers: {
        accept: "application/json",
      },
    });
    return data.data;
  }
  async function delComment(id: string, token: string | null) {
    const data = await axios.delete(BE_URI + "/comments/" + id, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
  async function createComment(
    id: string,
    token: string | null,
    content: string
  ) {
    await axios.post(API.comments + id, {
        content: content
    }, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    });
  }
  return {
    getComment,
    delComment,
    createComment
  };
}
export const getComments = async(id: string) =>
  await axios.get(API.comments + id).then((res) => res.data)