"use client"
import React, { useState } from 'react';
// import dynamic from 'next/dynamic';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Dynamically import SunEditor to avoid SSR issues
// const DynamicSunEditor = dynamic(() => import('suneditor-react'), {
//   ssr: false,
// });

export default function PostForm () {
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send a POST request to your FastAPI backend
      let token: string | null
      if (typeof window !== 'undefined')
        token = localStorage.getItem('jwt')
      if(token === undefined)
        router.push('/')
      console.log(token)
      await axios.post('http://localhost:8000/posts/', 
        {

        title: title,
        content: content,
      },
      {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

      // Redirect or give feedback upon success
      alert('Post created successfully!');
      router.push('/');  // Redirect to the homepage or a posts page
    } catch (error) {
      console.error('Error posting data:', error);
      alert('Failed to create post.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded w-2/3">
        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>

        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block mb-2">Content</label>
          <SunEditor
            setContents={content}
            onChange={(value: string) => setContent(value)}
            setOptions={{
              height: "200",
              buttonList: [
                ['formatBlock', 'bold', 'underline', 'italic', 'list', 'link', 'image'],
              ],
            }}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

