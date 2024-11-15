import useSWR from "swr";
import { getLikes } from "@/services/svLike";

// interface Return
const useLikes = (id: string) => {
  const { data, isLoading } = useSWR(id, getLikes);
  return {
    Likes: data,
    isLoadingLikes: isLoading,
    // isErrored: error
  };
};
export default useLikes;
