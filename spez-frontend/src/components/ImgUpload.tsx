"use client";
import React, { useState } from "react";
import useUser from "@/hooks/useUser";
interface ImgUploadProps {
  userId: string;
}
function ImageUploader({ userId }: ImgUploadProps) {
  const [base64Image, setBase64Image] = useState("");
  const { updUsrProfile } = useUser();
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setBase64Image(base64String);
        // You can also send the base64 string to the server here if needed
        console.log("Base64 Image String:", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      let token: any;
      if (typeof window !== undefined) token = localStorage.getItem("jwt");
      const response = await updUsrProfile(userId, token, base64Image);
      const data = await response.json();
      console.log("Image uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <a>

      {/* Thay đổi ảnh đại diện */}
      </a>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {base64Image && (
        <button onClick={handleSubmit} className="text-blue-700">
          Upload Image
        </button>
      )}
    </div>
  );
}

export default ImageUploader;
