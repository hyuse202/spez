// import useSWR from "swr";
// import { createPost } from "@/services/svPost";
// interface Props {
//     title: string | null,
//     content: string | null,
//     token: string | null
// }

// export const useCreatePost =  <T> ({title, content, token}: Props) => {
//     const {data, isLoading} = useSWR<T> (title, content, token)
//     return{data, isLoading, createPost: (data: object) => createPost(title!, content!, token!, data)
// }