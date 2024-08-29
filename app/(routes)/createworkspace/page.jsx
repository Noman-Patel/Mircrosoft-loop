"use client";
import CoverPicker from "@/app/_components/CoverPicker";
import EmojiPickerComponent from "@/app/_components/EmojiPickerComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/config/firebaseConfig";
import { useAuth, useUser } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { SmilePlus } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";

function CreateWorkspace() {
  const [coverImage, setCoverImage] = useState("/background.png");
  const [workspaceName, setWorkspaceName] = useState();
  const[emoji,setEmoji]= useState();
  const {user}=useUser();
  const{orgId} = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  {/* Create new workspace and save data in database */}
  const OnCreateWorkspace=async()=>{
    setLoading(true);
    const docId=Date.now();
          {/* If orgId is not available use user emailaddress*/}

    const result = await setDoc(doc(db,"Workspace", docId.toString()),{
      workspaceName:workspaceName,
      emoji:emoji,
      coverImage:coverImage,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      id:docId,
      orgId:orgId?orgId:user?.primaryEmailAddress?.emailAddress
    });
    setLoading(false)
    router.replace('/workspace/' + docId)
  }
  return (
    <div className="p-10 md:px-36 lg:px-64 xl:px-96 py-30">
      <div className="shadow-2xl rounded-lg">
        {/*Cover Image */}

        <CoverPicker setNewCover={(v)=>setCoverImage(v)} >
          <div className="relative group cursor-pointer">
            <h2 className="hidden absolute p-4 w-full h-full items-center group-hover:flex justify-center">
              Change Cover
            </h2>
            <div className="group-hover:opacity-40">
              <Image
                src={coverImage}
                width={400}
                height={400}
                className="w-full h-[180px] object-cover rounded-t-xl"
                alt="Cover Image"
              />
            </div>
          </div>
        </CoverPicker>

        {/* Input  Section */}

        <div className="p-12">
          <h2 className="font-medium text-2xl">Create Workspace</h2>

          <h2 className="text-lg mt-2">
            This is a shared space to collaborate with your team
          </h2>

          <div className="mt-8 flex gap-2 items-center">
            <EmojiPickerComponent setEmojiIcon={(v) => setEmoji(v)}>
              <Button variant="outline">
                {emoji?emoji:<SmilePlus size={20} className="mr-2" />}
              </Button>
            </EmojiPickerComponent>


            <Input
              placeholder="Workspace Name"
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </div>

          <div className="mt-7 flex justify-end gap-6">
            <Button disabled={!workspaceName?.length||loading}
            onClick={OnCreateWorkspace}>Create {loading&&<LoaderCircle   className="animate-spin ml-4"/>}</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspace;
