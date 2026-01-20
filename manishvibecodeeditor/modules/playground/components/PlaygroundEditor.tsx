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
  const providerRef = useRef<any>(null);
  const [value, setValue] = useState(content);
  const currentSuggestionRef = useRef<string | null>(null);
  const disposablesRef = useRef<any[]>([]);

  const language =
    languageMap[activeFile?.fileExtension ?? ""] ?? "typescript";

  /* -------------------- SYNC CONTENT -------------------- */
  useEffect(() => {
    setValue(content);
  }, [content]);

  /* -------------------- CLEAR ON FILE CHANGE -------------------- */
  useEffect(() => {
    aiSuggestions.clearSuggestion();
    currentSuggestionRef.current = null;
  }, [activeFile?.filename]);

  /* -------------------- MOUNT -------------------- */
  const onMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    editor.updateOptions({
      inlineSuggest: { enabled: true },
      quickSuggestions: false,
      suggestOnTriggerCharacters: false,
      wordWrap: "on",
      fontSize: 14,
      minimap: { enabled: false },
    });

    // Clear suggestion on Escape
    const escapeDisposable = editor.addCommand(monaco.KeyCode.Escape, () => {
      aiSuggestions.clearSuggestion();
      currentSuggestionRef.current = null;
    });
    disposablesRef.current.push(escapeDisposable);

    // Accept suggestion on Tab
    const tabDisposable = editor.addCommand(monaco.KeyCode.Tab, () => {
      if (currentSuggestionRef.current) {
        acceptSuggestion(editor, monaco);
        return;
      }
      // Insert normal tab
      const pos = editor.getPosition();
      const model = editor.getModel();
      model.applyEdits([
        {
          range: new monaco.Range(
            pos.lineNumber,
            pos.column,
            pos.lineNumber,
            pos.column
          ),
          text: "\t",
        },
      ]);
    });
    disposablesRef.current.push(tabDisposable);

    // Accept suggestion on Ctrl/Cmd+Right Arrow
    const ctrlRightDisposable = editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.RightArrow,
      () => {
        if (currentSuggestionRef.current) {
          acceptSuggestion(editor, monaco);
        }
      }
    );
    disposablesRef.current.push(ctrlRightDisposable);
  };

  /* -------------------- ACCEPT SUGGESTION -------------------- */
  const acceptSuggestion = (editor: any, monaco: Monaco) => {
    const suggestionToAccept = currentSuggestionRef.current;
    if (!suggestionToAccept) return;

    const position = editor.getPosition();
    const model = editor.getModel();
    if (!position || !model) return;

    const edit = {
      range: new monaco.Range(
        position.lineNumber,
        position.column,
        position.lineNumber,
        position.column
      ),
      text: suggestionToAccept,
    };

    model.applyEdits([edit]);

    const lines = suggestionToAccept.split("\n");
    const lastLineLength = lines[lines.length - 1].length;
    const newLineNumber = position.lineNumber + (lines.length - 1);
    const newColumn =
      lines.length === 1
        ? position.column + lastLineLength
        : lastLineLength + 1;

    editor.setPosition({
      lineNumber: newLineNumber,
      column: newColumn,
    });

    // Clear both references
    aiSuggestions.clearSuggestion();
    currentSuggestionRef.current = null;
  };

  /* -------------------- INLINE COMPLETIONS PROVIDER -------------------- */
  useEffect(() => {
    const monaco = monacoRef.current;
    const editor = editorRef.current;
    if (!monaco || !editor) return;

    // Dispose previous provider
    if (providerRef.current) {
      providerRef.current.dispose();
    }

    const provider = {
      provideInlineCompletions: (model: any, position: any) => {
        if (!aiSuggestions.suggestion) {
          currentSuggestionRef.current = null;
          return { items: [] };
        }

        // Store the current suggestion
        currentSuggestionRef.current = aiSuggestions.suggestion;

        return {
          items: [
            {
              insertText: aiSuggestions.suggestion,
              range: new monaco.Range(
                position.lineNumber,
                position.column,
                position.lineNumber,
                position.column
              ),
            },
          ],
        };
      },
      freeInlineCompletions: () => {},
    };

    providerRef.current = monaco.languages.registerInlineCompletionsProvider(
      { pattern: "**" },
      provider
    );

    return () => {
      if (providerRef.current) {
        providerRef.current.dispose();
        providerRef.current = null;
      }
    };
  }, [aiSuggestions.suggestion]);

  /* -------------------- TRIGGER INLINE UI -------------------- */
  useEffect(() => {
    if (!editorRef.current || !aiSuggestions.suggestion) return;

    try {
      editorRef.current.trigger(
        "ai",
        "editor.action.inlineSuggest.trigger",
        {}
      );
    } catch (e) {
      console.error("Error triggering inline suggest:", e);
    }
  }, [aiSuggestions.suggestion]);

  /* -------------------- AUTO FETCH -------------------- */
  useEffect(() => {
    if (!editorRef.current || aiSuggestions.isLoading) return;

    const debounce = setTimeout(() => {
      aiSuggestions.fetchSuggestion(editorRef.current);
    }, 1200);

    return () => clearTimeout(debounce);
  }, [value, aiSuggestions]);

  /* -------------------- CLEANUP -------------------- */
  useEffect(() => {
    return () => {
      disposablesRef.current.forEach((d) => d?.dispose?.());
      disposablesRef.current = [];
      if (providerRef.current) {
        providerRef.current.dispose();
      }
    };
  }, []);

  /* -------------------- CHANGE -------------------- */
  const onChange = (val?: string) => {
    if (val === undefined) return;
    setValue(val);
    onContentChange(val);
  };

  return (
    <div className="relative h-full">
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