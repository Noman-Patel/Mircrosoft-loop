import React from 'react'
import SideNav from '../../_components/SideNav'

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
            Document
        </div>
    </div>
  )
}

export default WorkspaceDocument