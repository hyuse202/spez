// "use client"
import usePost from "@/hooks/usePost";
import Link from "next/link";
import Comment from "@/components/Comment";
import Parser from 'html-react-parser'
import Image from "next/image";
import EagleEmoji from '../../../../public/eagle_emoji.png'
import CmtForm from "@/components/CmtForm";
import { getRelativeTime } from "@/utils/getRelativeTime";
type Props = {
  params: { id: string };
};
export default async function Post({ params }: Props) {
  const id: string = params.id;
  const { getPost, getLike, getComment } = await usePost();

  const info: any = await getPost(id);
  const likes: any = await getLike(id);
  const comment: any = await getComment(id);
  const real_date = new Date(info.created_at).toString();
  const author_url = "/user/" + info.author.id;
  return (
    <>
      <div className="w-full p-8 flex flex-col justify-center items-center space-y-2">
        <div className="text-black p-2 border-2 border-slate-950 rounded w-1/2 shadow">
          <div className="pl-10">
            <Link href={author_url} className="font-semibold"> {info.author.username}</Link>
            {"     "} {getRelativeTime(info.created_at)}
          </div>
          <div className="pl-2 text-2xl font-bold">{info.title}</div>
          <div className="p-2">{Parser(info.content)}</div>
          <div className="flex flex-row">
            <div className="w-auto flex flex-row">
            <p className="pt-[0.35rem]"> Ưng</p>
              <Image
                src={EagleEmoji}
                alt = "eagle_img"
                width={30}
                height={50} />
              <p className="pt-[0.35rem]">: {likes} </p>
            </div>
            <div className="w-auto pt-[0.35rem] ml-5 border-2 rounded-full px-2 border-black">Cmt: {comment.length}</div>
          </div>
          <CmtForm postId={id} />
        </div>
        <div className="border-2 border-slate-950 p-2 text-black rounded shadow h-full w-1/2 space-y-5">
        <a className="font-bold text-2xl">Bình Loạn</a>
          {comment.map((e: any) => (
            <Comment
                // author_id = {comment.author}
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
