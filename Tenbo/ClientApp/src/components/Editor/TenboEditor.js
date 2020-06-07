import React, {useEffect, useState} from "react";
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

export default function TenboEditor() {
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );

    const editor = React.useRef(null);

    function focusEditor() {
        editor.current.focus();
                
    }

    useEffect(() => {
        focusEditor()
    }, []);

    return (
        <div onClick={focusEditor}>
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={editorState => setEditorState(editorState)}
            />
        </div>
    );
}