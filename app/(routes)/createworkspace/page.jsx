"use client";
import CoverPicker from "@/app/_components/CoverPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SmilePlus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function CreateWorkspace() {
  const [coverImage, setCoverImage] = useState("/background.png");
  const [workspaceName, setWorkspaceName] = useState();
  return (
    <div className="p-10 md:px-36 lg:px-64 xl:px-96 py-30">
      <div className="shadow-2xl rounded-lg">
        {/*Cover Image */}

        <CoverPicker>
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
            <Button variant="outline">
              <SmilePlus size={20} className="mr-2" />
            </Button>

            <Input
              placeholder="Workspace Name"
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </div>

          <div className="mt-7 flex justify-end gap-6">
            <Button disabled={!workspaceName?.length}>Create</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspace;
