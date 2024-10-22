// "use client"
import usePost from "@/hooks/usePost";
import Link from "next/link";
import Comment from "@/components/Comment";
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
  console.log(comment.author);
  return (
    <>
      <div className="w-full p-8 flex flex-col justify-center items-center space-y-2">
        <div className="text-black p-2 border-2 border-slate-950 rounded w-1/2 shadow">
          <div className="pl-10 font-semibold">
            <Link href={author_url}> {info.author.username}</Link>
            {"     "} {real_date}
          </div>
          <div className="pl-2 text-2xl font-bold">{info.title}</div>
          <div className="p-2">{info.content}</div>
          <div className="flex flex-row">
            <div className="w-1/2">Likes: {likes}</div>
            <div className="w-1/2">Cmt: {comment.length}</div>
          </div>
        </div>
        <div className="border-2 border-slate-950 p-2 text-black rounded shadow h-full w-1/2 space-y-5">
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
