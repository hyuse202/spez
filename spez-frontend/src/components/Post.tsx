import Link from "next/link";
import Parser from "html-react-parser";
import { getRelativeTime } from "@/utils/getRelativeTime";
import { IPost } from "@/types";

const Post: React.FC<IPost> = ({ id, title, content, author, created_at }) => {
  const author_url = "/user/" + author.id;
  const post_url = "/post/" + id;
  return (
    <div className="text-black p-2 border-2 border-slate-950 rounded w-1/2 shadow h-[17rem] overflow-hidden">
      <div className="pl-10">
        <Link href={author_url} className="font-semibold ">
          {" "}
          {author.username}
        </Link>
        {"     "}
        <a className="text-sm">{getRelativeTime(created_at)}</a>
      </div>
      <div className="pl-2 text-2xl font-bold">
        <Link href={post_url}>{title}</Link>
      </div>
      <div className="p-2">{Parser(content)}</div>
      <div></div>
    </div>
  );
};
export default Post;
