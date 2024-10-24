import { getRelativeTime } from "@/utils/getRelativeTime";
import Link from "next/link";
import Parser from 'html-react-parser'
type Prop = {
  author: any;
  content: string;
  date: string;
};

export default function Comment({ author, content, date }: Prop) {
  const usr_url = "/user/" + author.username
  return (
    <>
        <div className="p-2 rounded shadow border-2 border-black">

            <div>

                <Link href={usr_url} className="font-semibold">
                {author?.username} 
                </Link>
                {"   "}
                <a className="text-sm"> 

                 {getRelativeTime(date)}
                </a>
            </div>
            <div className="pl-8">
                {Parser(content)}
            </div>
        </div>
    </>
  )
}
