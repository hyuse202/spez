"use client"
import svPost from "@/services/svPost";
import svCmt from "@/services/svCmt";
import Link from "next/link";
import Comment from "@/components/Comment";
import Parser from 'html-react-parser'
import CmtForm from "@/components/CmtForm";
import { getRelativeTime } from "@/utils/getRelativeTime";
import { GoTrash } from "react-icons/go";
import { IPost, IComment } from "@/types";
import LikeButton from "@/components/LikeButton";
import svLike from "@/services/svLike";
import { useEffect, useState } from "react";
type Props = {
  params: { id: string };
};
export default function Post({ params }: Props) {
  const [info, setInfo] = useState<IPost>()
  const [likes, setLikes] = useState<number | null>(null)
  const [comment, setComments] = useState<IComment[] | undefined>()
  const id: string = params.id;
  const { getPost, delPost } = svPost();
  const {getComment} = svCmt();
  const {getLike} = svLike()
  useEffect(() => {
    async function fetching () {
      let res = await getPost(id);
      setInfo(res)
      res = await getLike(id);
      setLikes(res);
      res = await getComment(id);
      setComments(res);
    }
    fetching()
  }, [])
  const author_url = "/user/" + info?.author.id;
  const handleDelPost = async () => {
    let token: string | null = null
    if (typeof window !== 'undefined')
      token = localStorage.getItem('jwt')
     await delPost(id, token);
    
  }
  return (
    <>
      <div className="w-full p-8 flex flex-col justify-center items-center space-y-2">
        <div className="text-black p-2 border-2 border-slate-950 rounded w-1/2 shadow">
          <div className="pl-10 flex flex-row justify-between">
            <div className="w-auto">

            <Link href={author_url} className="font-semibold"> {info?.author.username}</Link>
            {"     "} { info?.created_at? getRelativeTime(info?.created_at) : null }
            </div>
            <button onClick={handleDelPost} className="mr-8 text-red-600 text-semibold"> <GoTrash /></button>
          </div>
          <div className="pl-2 text-2xl font-bold">{info?.title}</div>
          <div className="p-2">{ info?.content ? Parser(info?.content) : null}</div>
          <div className="flex flex-row">
              <LikeButton initialLikes={likes} post_id={id} />
            <div className="w-auto mt-[0.35rem] ml-5 border-2 rounded-full px-2 border-black">Phản hồi: {comment?.length}</div>
          </div> 
          <CmtForm postId={id} />
        </div>
        <div className="border-2 border-slate-950 p-2 text-black rounded shadow h-full w-1/2 space-y-5">
        <a className="font-bold text-2xl">Bình Loạn</a>
          {comment?.map((element: IComment) => (
            <Comment
              key={element.id}
                id = {element.id}
                author = {element.author}
                content= {element.content}
                created_at = {element.created_at}
                updated_at= {element.updated_at}
                post_id= {element.post_id}
            />
          ))}
        </div>
      </div>
    </>
  );
}