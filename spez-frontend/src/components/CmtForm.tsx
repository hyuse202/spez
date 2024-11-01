"use client";
import React, { useState } from "react";
// import dynamic from 'next/dynamic';
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

// Dynamically import SunEditor to avoid SSR issues
// const DynamicSunEditor = dynamic(() => import('suneditor-react'), {
//   ssr: false,
// });

type Props = {
  postId: string;
};
export default function CmtForm({ postId }: Props) {
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send a POST request to your FastAPI backend
      let token: string | null = null;
      if (typeof window !== "undefined") token = localStorage.getItem("jwt");
      if (token === undefined) router.push("/");
      // console.log(token)
      await axios.post(
        `http://localhost:8000/posts/cmt/${postId}`,
        {
          content: content,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Redirect or give feedback upon success
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Failed to create post.");
    }
  };

  return (
    <div className="pt-3">
      <form onSubmit={handleSubmit} className=" rounded">
        {/* <h2 className="text-xl font-bold mb-2 mt-3">Tạo bình loạn</h2> */}
        <div className="mb-4">
          {/* <label htmlFor="content" className="block mb-2">Content</label> */}
          <SunEditor
            setContents={content}
            onChange={(value: string) => setContent(value)}
            setOptions={{
              height: "200",
              buttonList: [
                [
                  "formatBlock",
                  "bold",
                  "underline",
                  "italic",
                  "list",
                  "link",
                  "image",
                ],
              ],
            }}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded-full left-2/3"
        >
          Tạo bình loạn
        </button>
      </form>
    </div>
  );
}
