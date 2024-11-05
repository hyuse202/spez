"use client";
import svPost from "@/services/svPost";
import Post from "./Post";
import { IPost } from "@/types";
import { useEffect, useState } from "react";
export default function NewsFeed() {
  const [AllPost, setAllPost] = useState<IPost[] | null>();
  const { getAllPost } = svPost();
  useEffect(() => {
    async function fetching() {
      const res = await getAllPost();
      setAllPost(res);
    }
    fetching();
  });
  return (
    <>
      <div className="w-full h-screen p-8">
        <div className=" flex flex-col items-center gap-8">
          {AllPost?.map((post: IPost) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              created_at={post.created_at}
              updated_at={post.updated_at}
            />
          ))}
        </div>
      </div>
    </>
  );
}
