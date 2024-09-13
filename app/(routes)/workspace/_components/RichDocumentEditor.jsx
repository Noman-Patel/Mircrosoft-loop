"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from 'editorjs-alert';
import List from "@editorjs/list";
import NestedList from '@editorjs/nested-list';
import Checklist from '@editorjs/checklist'
import Embed from '@editorjs/embed';
import SimpleImage from "@editorjs/simple-image";
import Table from '@editorjs/table'
import CodeTool from '@editorjs/code';
import { TextVariantTune } from '@editorjs/text-variant-tune';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { useUser } from '@clerk/nextjs';
import Paragraph from '@editorjs/paragraph';
import { debounce } from 'lodash';
import GenerateAITemplate from './GenerateAITemplate';


function RichDocumentEditor({ params }) {
    const ref = useRef(); // EditorJS instance reference
    const isFetched = useRef(false); // Ref to track if the document is fetched
    const { user } = useUser(); // Get the user
    let editor;
    const [documentOutput, setDocumentOutput] = useState([]);
  
    useEffect(() => {
      if (user) {
        InitEditor();
      }
  
      // Cleanup the editor on unmount
      return () => {
        if (ref.current) {
          ref.current.destroy();
          ref.current = null;
        }
      };
    }, [user]);
  
    /**
     * Used to save Document
     */
    const SaveDocument = () => {
        console.log("UPDATE")
        ref.current.save().then(async (outputData) => {
          const docRef = doc(db, 'documentOutput', params?.documentid);
         
          await updateDoc(docRef, {
            output: JSON.stringify(outputData),
            editedBy: user?.primaryEmailAddress?.emailAddress
          })
        })
      }
    

  
    /**
     * Fetch the document output
     */
    const GetDocumentOutput = () => {
        const unsubscribe = onSnapshot(
          doc(db, 'documentOutput', params?.documentid),
          (doc) => {
            const output = doc.data()?.output;
      
            // Ensure the output has the correct structure for Editor.js
            if (doc.data()?.editedBy != user?.primaryEmailAddress?.emailAddress||isFetched==false) {
              doc.data().editedBy&&editor?.render(JSON.parse(doc.data()?.output)); 
              setDocumentOutput(output);

            } else {
              console.error('Incorrect data format for Editor.js render method');
            }
      
            isFetched.current = true; // Mark document as fetched
          }
        );
      
        // Unsubscribe on cleanup
        return unsubscribe;
      };
  
    /**
     * Initialize the editor
     */
    const InitEditor = () => {
      if (!editor?.current) {
        editor = new EditorJS({
          onChange: (api, event) => {
             SaveDocument()
            //ref.current.save().then(async (outputData) => {console.log(outputData)})
          },
          onReady:()=>{
            GetDocumentOutput()
          },
          /**
           * Id of Element that should contain Editor instance
           */
          holder: 'editorjs',
          tools: {
            header: Header,
            delimiter: Delimiter,
            paragraph:Paragraph,
            alert: {
              class: Alert,
              inlineToolbar: true,
              shortcut: 'CMD+SHIFT+A',
              config: {
                alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
                defaultType: 'primary',
                messagePlaceholder: 'Enter something',
              }
            },
            table: Table,
            list: {
              class: List,
              inlineToolbar: true,
              shortcut: 'CMD+SHIFT+L',
              config: {
                defaultStyle: 'unordered'
              },
            },
            checklist: {
              class: Checklist,
              shortcut: 'CMD+SHIFT+C',
              inlineToolbar: true,
            },
            image: SimpleImage,
            code: {
              class: CodeTool,
              shortcut: 'CMD+SHIFT+P'
            },
            //   textVariant: TextVariantTune
  
  
          },
  
        });
        ref.current = editor;
      }
    }
  
  
    return (
      <div className=' '>
      <div id='editorjs' className='w-[70%]'></div>
      <div className='fixed bottom-10 md:ml-80 left-0 z-10'>
        <GenerateAITemplate setGenerateAIOutput={(output)=>editor?.render(output)} />
      </div>
    </div>
    )
  }
  

export default RichDocumentEditor