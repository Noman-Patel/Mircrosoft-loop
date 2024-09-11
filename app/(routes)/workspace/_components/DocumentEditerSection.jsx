import React from 'react'
import DcoumentHeader from './DcoumentHeader'
import DocumentInfo from './DocumentInfo'

function DocumentEditerSection({params}) {
  return (
    <div>
        {/* Header */}
        <DcoumentHeader/> 
        {/* Document Info */}
        <DocumentInfo params={params}/>
    </div>
  )
}

export default DocumentEditerSection