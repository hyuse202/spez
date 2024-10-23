import Link from "next/link";
import Parser from 'html-react-parser'
type Props = {
  id: string;
  title: string;
  content: string;
  author: any;
  date: string;
};
export default function Post({ id, title, content, author, date }: Props) {
  const author_url = "/user/" + author.id;
  const post_url = "/post/" + id;
  const real_date = new Date(date).toString();
  return (
    <div className="text-black p-2 border-2 border-slate-950 rounded w-1/2 shadow">
      <div className="pl-10 font-semibold">
        <Link href={author_url}> {author.username}</Link>
        {"     "} {real_date}
      </div>
      <div className="pl-2 text-2xl font-bold">
        <Link href={post_url}>{title}</Link>
      </div>
      <div className="p-2">{Parser(content)}</div>
      <div></div>
    </div>
  );
}
