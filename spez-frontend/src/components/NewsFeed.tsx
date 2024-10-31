import svPost from "@/utils/svPost"
import Post from "./Post";

export default async function NewsFeed() {
    const {getAllPost} =  svPost();
    const AllPost = await getAllPost();
    // console.log(AllPost)
    return (
        <>
            <div className="w-full h-screen p-8">
                <div className=" flex flex-col items-center gap-8">

                {
                    AllPost?.map((post:any) => (
                        <Post
                        id = {post.id}
                        title = {post.title}
                        content = {post.content}
                        author = {post.author}
                        date = {post.created_at}
                        />
                    )
                    )
                }
                </div>
            </div>
        </>
    )
}