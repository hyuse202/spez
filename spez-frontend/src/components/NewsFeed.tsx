"use client";
// import svPost from "@/services/svPost";
import Post from "./Post";
import { IPost } from "@/types";
// import { useEffect, useState } from "react";
import usePosts from "@/hooks/usePosts";
export default function NewsFeed() {
  const {posts, isLoading} = usePosts()
  return (
    <>
      <div className="w-full h-screen p-8">
        <div className=" flex flex-col items-center gap-8">
          {posts?.map((post: IPost) => (
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
