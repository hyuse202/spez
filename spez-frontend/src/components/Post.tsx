type Props = {
  id: string;
  title: string;
  content: string;
//   additional: string;
//   episodeId?: string;
};
export default function Post({id, title, content}: Props) {
    return <>
        <div>
            <div>
                    {id}
            </div>
            <div>
                {title}
            </div>
            <div>
                    {content}
            </div>
        </div>
    </>
}
