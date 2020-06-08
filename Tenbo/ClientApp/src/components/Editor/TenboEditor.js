import React, {useEffect, useState} from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Button} from "@material-ui/core";
import html2pdf from 'html2pdf.js';
export default function TenboEditor() {
    const [editor, SetEditor] = useState(null);
       
    function save(){
        if(editor != null){
            console.log("saving");
            console.log(editor.getData());
            let worker = html2pdf().set({ html2canvas: { scale: 8 } });
            
            worker.from(editor.getData()).save("test.pdf")
        }
    }
    
    
    return (
        <div>
            <CKEditor
                editor={ ClassicEditor }
            
                data="<p>Hello from CKEditor 5!</p>"
                onInit={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                    SetEditor(editor);
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
            <Button onClick={save} >save</Button>
        </div>
        
    );
}