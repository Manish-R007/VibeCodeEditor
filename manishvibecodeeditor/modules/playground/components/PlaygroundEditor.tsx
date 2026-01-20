"use client";

import { useEffect, useRef, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { useAISuggestions } from "../hooks/useAiSuggestion";

/* -------------------- TYPES -------------------- */
type PlaygroundEditorProps = {
  activeFile: {
    filename?: string;
    fileExtension?: string;
  } | null;
  content: string;
  onContentChange: (value: string) => void;
  suggestionLoading: boolean;
  aiSuggestions: ReturnType<typeof useAISuggestions> | null;
};

/* -------------------- LANGUAGE MAP -------------------- */
const languageMap: Record<string, string> = {
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  json: "json",
  html: "html",
  css: "css",
};

/* -------------------- COMPONENT -------------------- */
export const PlaygroundEditor = ({
  activeFile,
  content,
  onContentChange,
  suggestionLoading,
  aiSuggestions,
}: PlaygroundEditorProps) => {
  if (!aiSuggestions) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-gray-400">
        Initializing AI…
      </div>
    );
  }

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [value, setValue] = useState(content);

  const language =
    languageMap[activeFile?.fileExtension ?? ""] ?? "typescript";

  /* -------------------- SYNC CONTENT -------------------- */
  useEffect(() => {
    setValue(content);
  }, [content]);

  /* -------------------- CLEAR ON FILE SWITCH -------------------- */
  useEffect(() => {
    if (editorRef.current) {
      aiSuggestions.rejectSuggestion(editorRef.current);
    }
  }, [activeFile?.filename, aiSuggestions]);

  /* -------------------- ON MOUNT -------------------- */
  const onMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    editor.updateOptions({
      inlineSuggest: { enabled: true },
      quickSuggestions: false,
      suggestOnTriggerCharacters: false,
      minimap: { enabled: true },
      wordWrap: "on",
      fontSize: 14,
    });

    /* TAB → accept suggestion */
    editor.addCommand(monaco.KeyCode.Tab, () => {
      if (aiSuggestions.suggestion && aiSuggestions.position) {
        aiSuggestions.acceptSuggestion(editor, monaco);
        // REMOVED: aiSuggestions.rejectSuggestion(editor); // This was clearing the suggestion immediately
      }
    });

    /* ESC → dismiss suggestion */
    editor.addCommand(monaco.KeyCode.Escape, () => {
      aiSuggestions.rejectSuggestion(editor);
    });

    /* typing clears stale AI */
    editor.onDidChangeModelContent(() => {
      if (aiSuggestions.suggestion) {
        aiSuggestions.rejectSuggestion(editor);
      }
    });
  };

  /* -------------------- INLINE PROVIDER (refresh on suggestion change) -------------------- */
  useEffect(() => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;

    const disposable = monaco.languages.registerInlineCompletionsProvider(language, {
      provideInlineCompletions(model, position) {
        if (!aiSuggestions.suggestion || !aiSuggestions.position) {
          return { items: [], dispose() {} };
        }

        return {
          items: [
            {
              insertText: aiSuggestions.suggestion,
              range: new monaco.Range(
                aiSuggestions.position.line,
                aiSuggestions.position.column,
                aiSuggestions.position.line,
                aiSuggestions.position.column
              ),
            },
          ],
          dispose: () => {},
        };
      },
      disposeInlineCompletions() {},
    });

    // Trigger inline suggestion preview
    if (aiSuggestions.suggestion) {
      editor.trigger("ai", "editor.action.inlineSuggest.trigger", {});
    }

    return () => disposable.dispose();
  }, [aiSuggestions.suggestion, language]);

  /* -------------------- AUTO AI TRIGGER -------------------- */
  useEffect(() => {
    if (!editorRef.current || !aiSuggestions.isEnabled || aiSuggestions.isLoading) {
      return;
    }

    const editor = editorRef.current;

    const debounce = setTimeout(() => {
      aiSuggestions.fetchSuggestion(editor).then(() => {
        // Trigger inline suggestion after fetching
        if (aiSuggestions.suggestion) {
          editor.trigger("ai", "editor.action.inlineSuggest.trigger", {});
        }
      });
    }, 350);

    return () => clearTimeout(debounce);
  }, [value, aiSuggestions, language]);

  /* -------------------- HANDLE CONTENT CHANGE -------------------- */
  const onChange = (val?: string) => {
    if (val === undefined) return;
    setValue(val);
    onContentChange(val);
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="relative h-full">
      <div className="absolute top-2 left-2 z-50 text-xs bg-black/70 text-white px-3 py-1 rounded">
        🤖 AI: {aiSuggestions.isEnabled ? "ON" : "OFF"}
      </div>

      {(suggestionLoading || aiSuggestions.isLoading) && (
        <div className="absolute top-2 right-2 z-50 text-xs bg-blue-600 text-white px-3 py-1 rounded">
          AI Thinking…
        </div>
      )}

      <Editor
        height="100%"
        value={value}
        onChange={onChange}
        onMount={onMount}
        language={language}
        theme="vs-dark"
      />
    </div>
  );
};