// components/LikeButton.tsx
"use client"
import React, { useState } from "react";
import Image from "next/image";
import EagleEmoji from "../../public/eagle_emoji.png";
import {svLike} from "@/services/svLike";
interface LikeButtonProps {
  initialLikes: number | null;
  post_id: string
}

const  LikeButton: React.FC<LikeButtonProps> = ({ initialLikes, post_id }) => {
  const [likes, setLikes] = useState<number | null>(initialLikes);
  const [liked, setLiked] = useState(false);
  const {postLike, delLike} = svLike()

  const handleLike = async () => {
    try {
        let token: string | null = null
        if(typeof window !== "undefined") token = localStorage.getItem("jwt")
        
      const response = liked? await postLike(post_id, token) : await delLike(post_id, token);
      if (response.status == 201 || response.status == 204) {
        setLiked(!liked);
        setLikes((prev) => (prev ?  (liked? (prev - 1) : (prev + 1)) : null ))
      }
      
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  return (
    <>
      <button
        onClick={handleLike}
        className="w-auto flex flex-row border-2 border-black rounded-full px-2"
        aria-pressed={liked}
      >
        <p className="pt-[0.35rem]"> {!liked ? "Ưng" : "ko Ưng"} {likes}</p>
        <Image src={EagleEmoji} alt="eagle_img" width={30} height={50} />
      </button>
    </>
  );
};

export default LikeButton;
