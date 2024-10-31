import svPost from "@/utils/svPost"
import Post from "./Post";
import { IPost } from "@/types";
export default async function NewsFeed() {
    const {getAllPost} =  svPost();
    const AllPost = await getAllPost();
    // console.log(AllPost)
    return (
        <>
            <div className="w-full h-screen p-8">
                <div className=" flex flex-col items-center gap-8">

                {
                    AllPost?.map((post: IPost) => (
                        <Post
                        key={post.id}
                        id = {post.id}
                        title = {post.title}
                        content = {post.content}
                        author = {post.author}
                        created_at = {post.created_at}
                        updated_at= {post.updated_at}
                        />
                    )
                    )
                }
                </div>
            </div>
        </>
    )
}