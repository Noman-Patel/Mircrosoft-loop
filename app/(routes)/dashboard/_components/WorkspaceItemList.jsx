"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useMemo } from 'react';

function WorkspaceItemList({ workspaceList }) {
  const router = useRouter();

  const OnClickWorkspaceItem = (workspaceId) => {
    router.push('/workspace/' + workspaceId);
  };

  const workspaceItems = useMemo(() => {
    return workspaceList?.map((workspace) => (
      <div
        key={workspace.id}
        className="border shadow-xl rounded-xl hover:scale-105 transition-all cursor-pointer"
        onClick={() => OnClickWorkspaceItem(workspace.id)}
      >
        <Image
          src={workspace?.coverImage}
          width={400}
          height={200}
          alt="cover"
          className="h-[150px] object-cover rounded-t-xl"
        />
        <div className="p-4 rounded-b-xl">
          <h2 className="flex gap-2">
            {workspace?.emoji} {workspace.workspaceName}
          </h2>
        </div>
      </div>
    ));
  }, [workspaceList]);

  return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">{workspaceItems}</div>;
}

export default WorkspaceItemList;