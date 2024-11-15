import useSWR from "swr"
import { getComments } from "@/services/svCmt"
const  useComments = (id: string) => {

    const {data, isLoading } = useSWR(id, getComments)
    return {
        Comments: data,
        isLoadingComments: isLoading,
        // isErrored: error
    }
}
export default useComments;