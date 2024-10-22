type Props = {
  id: string;
  title: string;
  content: string;
  author: string,
//   additional: string;
//   episodeId?: string;
};
export default function Post({id, title, content, author}: Props) {
    return <div className="text-black p-2 border-2 border-slate-950 rounded w-1/2 shadow">
            <div className="pl-10 font-semibold">
                    {author}
            </div>
            <div className="pl-2 text-2xl font-bold">
                {title}
            </div>
            <div className="p-2">
                    {content}
            </div>
        </div>

}
