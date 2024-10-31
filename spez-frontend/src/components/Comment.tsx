import { getRelativeTime } from "@/utils/getRelativeTime";
import Link from "next/link";
import Parser from "html-react-parser";
import svPost from "@/utils/svPost";
import { GoTrash } from "react-icons/go";
type Prop = {
  id: string;
  author: any;
  content: string;
  date: string;
};

export default async function Comment({ id, author, content, date }: Prop) {
  const usr_url = "/user/" + author.id;
  const { delComment } = await svPost();
  const handleDelCmt = async (e: any) => {
    let token: any;
    if (typeof window !== "undefined") token = localStorage.getItem("jwt");
    await delComment(id, token);
  };
  return (
    <>
      <div className="p-2 rounded shadow border-2 border-black">
        <div className="flex flex-row justify-between">
          <div className="w-auto">
            <Link href={usr_url} className="font-semibold">
              {author?.username}
            </Link>
            {"   "}
            <a className="text-sm">{getRelativeTime(date)}</a>
          </div>
            <button onClick={handleDelCmt} className="text-red-600 text-semibold mr-6"> <GoTrash /></button>
        </div>
        <div className="pl-8">{Parser(content)}</div>
      </div>
    </>
  );
}
