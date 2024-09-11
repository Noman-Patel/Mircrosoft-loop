import React from 'react'
import SideNav from '../../_components/SideNav'
import DocumentEditerSection from '../../_components/DocumentEditerSection'

function WorkspaceDocument({params}){
  return (
    <div>
        {/* Side Nav */}
        {/* Params is the workspaceid and documentid parameter  */}

        <div className=''>
            <SideNav params={params}/>
        </div>
        {/* Document */}
        <div className='md:ml-80'>
            <DocumentEditerSection params={params}/>
        </div>
    </div>
  )
}

export default WorkspaceDocument