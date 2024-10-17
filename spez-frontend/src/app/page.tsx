// "use client"
import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import usePost from '@/hooks/usePost';
import Post from '@/components/Post';
export default async function Home() {
  // const router = useRouter();
  const {getAllPost} = usePost()
  const AllPost = await getAllPost()
  // useEffect(() => {
  //   const token = localStorage.getItem('jwt');
  //   if (!token) {
  //     router.push('/signin');
  //   }
  // }, []);
  console.log(AllPost)
  return (<div>
    {
      AllPost?.map((post: any) => (
        <Post
          id = {post.id}
          title= {post.title}
          content = {post.content}
        />
      ))
    }
  </div> )
}
