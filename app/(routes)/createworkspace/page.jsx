"use client";
import CoverPicker from '@/app/_components/CoverPicker';
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/config/firebaseConfig';
import { useAuth, useUser } from '@clerk/nextjs';
import { doc, setDoc } from 'firebase/firestore';
import { Loader2Icon, SmilePlus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import uuid4 from 'uuid4';

function CreateWorkspace() {
  const [coverImage, setCoverImage] = useState('/cover.png');
  const [workspaceName, setWorkspaceName] = useState('');
  const [emoji, setEmoji] = useState(null);
  const { user } = useUser();
  const { orgId } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /**
   * Used to create new workspace and save data in database
   */
  const OnCreateWorkspace = async () => {
    if (!user || !workspaceName?.length) return;
    
    setLoading(true);
    try {
      const workspaceId = Date.now();
      // Create workspace document
      await setDoc(doc(db, 'Workspace', workspaceId.toString()), {
        workspaceName: workspaceName,
        emoji: emoji || '',
        coverImage: coverImage,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        id: workspaceId,
        orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress
      });

      // Generate a unique document ID for the first document
      const docId = uuid4();
      
      // Create a default workspace document
      await setDoc(doc(db, 'workspaceDocuments', docId.toString()), {
        workspaceId: workspaceId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        coverImage: null,
        emoji: null,
        id: docId,
        documentName: 'Untitled Document',
        documentOutput: []
      });

      // Create an empty output entry for the document
      await setDoc(doc(db, 'documentOutput', docId.toString()), {
        docId: docId,
        output: []
      });

      // Redirect to the workspace and document
      router.replace(`/workspace/${workspaceId}/${docId}`);
    } catch (error) {
      console.error('Error creating workspace:', error);
      // Optionally, show an error toast or message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-10 md:px-36 lg:px-64 xl:px-96 py-28'>
      <div className='shadow-2xl rounded-xl'>
        {/* Cover Image  */}
        <CoverPicker setNewCover={(v) => setCoverImage(v)}>
          <div className='relative group cursor-pointer'>
            <h2 className='hidden absolute p-4 w-full h-full items-center group-hover:flex justify-center'>Change Cover</h2>
            <div className='group-hover:opacity-40'>
              <Image src={coverImage} width={400} height={400} className='w-full h-[180px] object-cover rounded-t-xl' />
            </div>
          </div>
        </CoverPicker>

        {/* Input Section  */}
        <div className='p-12'>
          <h2 className='font-medium text-xl'>Create a new workspace</h2>
          <h2 className='text-sm mt-2'>
            This is a shared space where you can collaborate with your team. You can always rename it later.
          </h2>
          <div className='mt-8 flex gap-2 items-center'>
            <EmojiPickerComponent setEmojiIcon={(v) => setEmoji(v)}>
              <Button variant='outline'>
                {emoji ? emoji : <SmilePlus />}
              </Button>
            </EmojiPickerComponent>
            <Input
              placeholder='Workspace Name'
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </div>
          <div className='mt-7 flex justify-end gap-6'>
            <Button disabled={!workspaceName?.length || loading} onClick={OnCreateWorkspace}>
              Create {loading && <Loader2Icon className='animate-spin ml-2' />}
            </Button>
            <Button variant='outline'>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspace;