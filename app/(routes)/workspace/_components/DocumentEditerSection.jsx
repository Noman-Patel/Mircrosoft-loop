import React from 'react'
import DcoumentHeader from './DcoumentHeader'
import DocumentInfo from './DocumentInfo'
import RichDocumentEditor from './RichDocumentEditor'

function DocumentEditerSection({params}) {
  return (
    <div>
        {/* Header */}
        <DcoumentHeader/> 
        {/* Document Info */}
        <DocumentInfo params={params}/>

        {/* Rich Text Editor  */}
 
        <RichDocumentEditor />
 
     {/* <div className='fixed right-10 bottom-10 '>
        <Button onClick={() => setOpenComment(!openComment)}>
          {openComment ? <X /> : <MessageCircle />} </Button>
        {openComment && <CommentBox />}
      </div>*/}
  </div>
  )
}

export default DocumentEditerSection