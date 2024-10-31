"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
interface ImgUrlProps {
  base64String: string;
}
const ImageFromBase64 = ({ base64String }: ImgUrlProps) => {
  const [imageUrl, setImageUrl] = useState<string | null> (null);

  useEffect(() => {
    if (base64String) {
      // Convert base64 string to a blob
      const byteCharacters = atob(base64String);
      const byteNumbers = Array.from(byteCharacters).map((char) =>
        char.charCodeAt(0)
      );
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust MIME type as needed

      // Create a URL from the blob and set it to the imageUrl state
      const url: string = URL.createObjectURL(blob);
      setImageUrl(url);

      // Clean up the URL when the component unmounts
      return () => URL.revokeObjectURL(url);
    }
  }, [base64String]);

  return (
    <div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Decoded Base64 Image"
          className="rounded-full mb-5"
          width={200}
          height={300}
        />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ImageFromBase64;
