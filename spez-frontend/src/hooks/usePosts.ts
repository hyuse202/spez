import useSWR from "swr"
import { getAllPost } from "@/services/svPost"

// interface Return 
const  usePosts = () => {

    const {data, isLoading } = useSWR(" ", getAllPost)
    return {
        posts: data,
        isLoading,
        // isErrored: error
    }
}
export default usePosts;