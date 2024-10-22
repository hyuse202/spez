type Prop = {
  author: any;
  content: string;
  date: string;
};
export default function Comment({ author, content, date }: Prop) {

  const real_date = new Date(date).toString();
  return (
    <>
        <div className="p-2 bg-gray-500 rounded shadow">
            <div>
                {author?.username} {"   "} {real_date}
            </div>
            <div className="pl-8">
                {content}
            </div>
        </div>
    </>
  )
}
