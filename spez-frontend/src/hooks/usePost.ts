import useSWR from "swr"
import { getPost } from "@/services/svPost"

// interface Return 
const  usePost = (id: string) => {

    const {data, isLoading } = useSWR(id, getPost)
    return {
        post: data,
        isLoadingInfo: isLoading,
        // isErrored: error
    }
}
export default usePost;