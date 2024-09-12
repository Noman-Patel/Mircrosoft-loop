"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Paragraph from '@editorjs/paragraph';
import Alert from 'editorjs-alert';
import List from "@editorjs/list";
import NestedList from '@editorjs/nested-list';
import Checklist from '@editorjs/checklist'
import Embed from '@editorjs/embed';
import SimpleImage from "@editorjs/simple-image";
import Table from '@editorjs/table'
import CodeTool from '@editorjs/code';
import { TextVariantTune } from '@editorjs/text-variant-tune';



function RichDocumentEditor () {
    const ref=useRef();
    let editor;

    useEffect(() => {
        InitEditor();
      },[])

      const SaveDocument=()=>{
        ref.current.save().then(async (outputData) => {
            console.log(outputData)

        })
      }    
    const InitEditor = () => {
        if (!editor?.current) {
            editor = new EditorJS({
                onChange: (api, event) => {
                   SaveDocument()
                  //ref.current.save().then(async (outputData) => {console.log(outputData)})
                },
        
            
            /**
             * Id of Element that should contain Editor instance
             */
            holder: 'editorjs',
            tools: {
              header: Header,
              delimiter: Delimiter,
              paragraph: {
                class: Paragraph,
                inlineToolbar: true,
              },
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
    </div>
  </div>
)
}

export default RichDocumentEditor