export interface IPost {
    id: string,
    title: string,
    content: string,
    created_at: string,
    updated_at: string
    author: user
}
export interface user {
  id: string;
  username: string;
  email: string;
  created_at: string;
}

export interface IComment {
    content: string,
    id: string,
    created_at: string,
    updated_at: string,
    author: user,
    post_id: string
}