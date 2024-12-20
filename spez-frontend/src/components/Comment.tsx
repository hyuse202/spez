import { getRelativeTime } from "@/utils/getRelativeTime";
import Link from "next/link";
import Parser from "html-react-parser";
import { GoTrash } from "react-icons/go";
import { IComment } from "@/types";
import {svCmt} from "@/services/svCmt";
  
export default async function Comment({id, author, content, created_at}: IComment) {
  const usr_url = "/user/" + author.id;
  const { delComment } = await svCmt();
  const handleDelCmt = async () => {
    let token: string | null = null;
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
            <a className="text-sm">{getRelativeTime(created_at)}</a>
          </div>
          <button
            onClick={handleDelCmt}
            className="text-red-600 text-semibold mr-6"
          >
            {" "}
            <GoTrash />
          </button>
        </div>
        <div className="pl-8">{Parser(content)}</div>
      </div>
    </>
  );
}
