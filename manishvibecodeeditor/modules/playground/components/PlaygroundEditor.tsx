'use cilent'
import {useRef,useEffect,useCallback} from 'react'
import {configureMonaco, defaultEditorOptions,getEditorLanguage} from "@/modules/playground/lib/editor-config"
import { TemplateFile } from '../lib/path-to-json'
import { Editor, Monaco } from '@monaco-editor/react'


interface PlaygroundEditorProps{
    activeFile:TemplateFile | null
    content:string
    onContentChange:(content:string) => void
}


const PlayGroundEditor = ({activeFile,content,onContentChange}:PlaygroundEditorProps) => {
    const editorRef = useRef<any>(null);
    const monacoRef = useRef<Monaco | null>(null);

    const handleEditorDidMount = (editor:any , monaco:Monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;
        configureMonaco(monaco);

        editor.updateOptions({
            ...defaultEditorOptions
        })

        configureMonaco(monaco);

        updateEditorLanguage()

    }

    const updateEditorLanguage = () => {
        if(!activeFile || !monacoRef.current || !editorRef.current) return;
        const model = editorRef.current.getModel();
        if(!model) return;
        const language = getEditorLanguage(activeFile.fileExtension || "");

        try {
            monacoRef.current.editor.setModelLanguage(model, language);
        } catch (error) {
            console.error("Failed to update editor language:", error);
        }
    }

    
    useEffect(() => {
        updateEditorLanguage();
    }, [activeFile]);

    return (
        <div className='h-full relative'>
            <Editor
                height="100%"
                value={content}
                onChange={(value) => onContentChange(value || '')}
                onMount={handleEditorDidMount}
                language={activeFile? getEditorLanguage(activeFile.filename) : 'plaintext'}
                //@ts-ignore
                options={defaultEditorOptions}
            />
            <div>
                
            </div>

        </div>

        
    )
}



export default PlayGroundEditor;