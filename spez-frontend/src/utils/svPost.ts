import { BE_URI } from "@/utils/constants";
import axios from "axios";
export default function svPost() {

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
  async function delPost(id: string, token: string) {
    const data = await axios.delete(API.post + id, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
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
  async function delComment(id: string, token: string) {
    const data = await axios.delete(BE_URI + "/comments/" + id, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
  return {
    getAllPost,
    getPost,
    getLike,
    getComment,
    delPost,
    delComment
  };
}
