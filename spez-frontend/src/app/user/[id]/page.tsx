import React from "react";
import useUser from "@/hooks/useUser";
import ImageUploader from "@/components/ImgUpload";
import ImageFromBase64 from "@/components/DisplayImg";
type Props = {
  params: { id: string };
};
export default async function User({ params }: Props) {
  const id: string = params.id;
  const { getUser, getUsrProfile } = useUser();
  const usr = await getUser(id);
  const usrprofile = await getUsrProfile(id);
  return (
    <>
      <div className="w-full p-8 flex flex-col justify-center items-center">
        <div className=" flex flex-row w-1/2 h-[30rem]  items-center border-2 border-black rounded justify-center gap-7">
          <div className="justify-center items-center">
            <ImageFromBase64 base64String={usrprofile.avatar} />
            <a className="pt-5">

            Thay đổi ảnh đại diện
            </a>
            <ImageUploader userId="id" />
          </div>
          <div className=" ">
            <div className="text-2xl font-semibold">{usr.username}</div>
            <div> Gender: {usrprofile.gender}</div>
            <div> Description: {usrprofile.description}</div>
          </div>
        </div>
      </div>
    </>
  );
}
