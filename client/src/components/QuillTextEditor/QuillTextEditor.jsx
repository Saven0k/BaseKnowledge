import { useEffect, useRef, useState } from "react";
import '../../../node_modules/react-quill/dist/quill.snow.css';
import Quill from "quill";
import './style.css';


const QuillTextEditor = ({ setContent, value, newContent }) => {
    const editorRef = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        if (newContent === null || newContent === '' && quillInstance.current) {
            quillInstance.current.root.innerHTML = ''
        }
    }, [newContent])
    useEffect(() => {
        if (value) {
            editorRef.current.innerHTML = value;
        }
        if (editorRef.current && !quillInstance.current) {
            quillInstance.current = new Quill(editorRef.current, { theme: "snow" });
            quillInstance.current.on("text-change", () => {
                setContent(quillInstance.current.root.innerHTML)

            });
        }
    }, []);

    return <div ref={editorRef} className="editorQ" />

}

export default QuillTextEditor;