"use client"
import usePost from "@/hooks/usePost";
import Link from "next/link";
import Comment from "@/components/Comment";
import Parser from 'html-react-parser'
import Image from "next/image";
import EagleEmoji from '../../../../public/eagle_emoji.png'
import CmtForm from "@/components/CmtForm";
import { getRelativeTime } from "@/utils/getRelativeTime";
import axios from "axios";
import { GoTrash } from "react-icons/go";
type Props = {
  params: { id: string };
};
export default async function Post({ params }: Props) {
  const id: string = params.id;
  const { getPost, getLike, getComment, delPost } = await usePost();

  const info: any = await getPost(id);
  const likes: any = await getLike(id);
  const comment: any = await getComment(id);
  const author_url = "/user/" + info.author.id;
  const handleLikeButton = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send a POST request to your FastAPI backend
      let token: any
      if (typeof window !== 'undefined')
        token = localStorage.getItem('jwt')
      await axios.post(`http://localhost:8000/likes/?post_id=${id}`, 
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Redirect or give feedback upon success
      // alert('Post created successfully!');
    } catch (error) {
      console.error('Error posting data:', error);
      alert('Failed to create like.');
    }
  };
  const handleDelPost = async (e: React.FormEvent) => {
    let token: any
    if (typeof window !== 'undefined')
      token = localStorage.getItem('jwt')
    const deletePost:any = await delPost(id, token);
    console.log(deletePost)
    
  }
  return (
    <>
      <div className="w-full p-8 flex flex-col justify-center items-center space-y-2">
        <div className="text-black p-2 border-2 border-slate-950 rounded w-1/2 shadow">
          <div className="pl-10 flex flex-row justify-between">
            <div className="w-auto">

            <Link href={author_url} className="font-semibold"> {info.author.username}</Link>
            {"     "} {getRelativeTime(info.created_at)}
            </div>
            <button onClick={handleDelPost} className="mr-8 text-red-600 text-semibold"> <GoTrash /></button>
          </div>
          <div className="pl-2 text-2xl font-bold">{info.title}</div>
          <div className="p-2">{Parser(info.content)}</div>
          <div className="flex flex-row">
            <button onClick={handleLikeButton} className="w-auto flex flex-row border-2 border-black rounded-full px-2">
            <p className="pt-[0.35rem]"> Ưng</p>
              <Image
                src={EagleEmoji}
                alt = "eagle_img"
                width={30}
                height={50} />
              <p className="pt-[0.35rem]">: {likes} </p>
            </button>
            <div className="w-auto mt-[0.35rem] ml-5 border-2 rounded-full px-2 border-black">Phản hồi: {comment.length}</div>
          </div>
          <CmtForm postId={id} />
        </div>
        <div className="border-2 border-slate-950 p-2 text-black rounded shadow h-full w-1/2 space-y-5">
        <a className="font-bold text-2xl">Bình Loạn</a>
          {comment.map((e: any) => (
            <Comment
                // author_id = {comment.author}
                id = {e.id}
                author = {e.author}
                content= {e.content}
                date = {e.created_at}
            />
          ))}
        </div>
      </div>
    </>
  );
}
