// "use client"
// import { useRouter } from 'next/navigation';
import NewsFeed from '@/components/NewsFeed';
export default function Home() {
  // const router = useRouter();
  // useEffect(() => {
  //   const token = localStorage.getItem('jwt');
  //   if (!token) {
  //     router.push('/signin');
  //   }
  // }, []);
  return (
    <NewsFeed />
  )
}
