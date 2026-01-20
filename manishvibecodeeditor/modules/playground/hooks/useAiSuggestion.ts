"use client";

import { useState, useCallback, useRef } from "react";

export const useAISuggestions = () => {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<{ line: number; column: number } | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);

  const decorationIdsRef = useRef<string[]>([]);
  const lastContextKeyRef = useRef<string>("");

  const toggleEnabled = useCallback(() => {
    setIsEnabled(prev => !prev);
    setSuggestion(null);
    setPosition(null);
    decorationIdsRef.current = [];
    lastContextKeyRef.current = "";
  }, []);

  const fetchSuggestion = useCallback(async (editor: any) => {
    if (!isEnabled || isLoading || !editor) return;

    const model = editor.getModel();
    const cursor = editor.getPosition();
    if (!model || !cursor) return;

    const fullText = model.getValue();
    const offset = model.getOffsetAt(cursor);

    const prefix = fullText.slice(0, offset);
    const suffix = fullText.slice(offset);

    // 🔥 STRONG DEDUPLICATION KEY
    const contextKey =
      prefix.slice(-400) + "::" + suffix.slice(0, 200);

    if (contextKey === lastContextKeyRef.current) return;
    lastContextKeyRef.current = contextKey;

    setIsLoading(true);

    try {
      const res = await fetch("/api/code-completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prefix,
          suffix,
          language: model.getLanguageId(),
        }),
      });



      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const text =
        data.completion || data.suggestion || "";

        console.log(text);
        

      if (text.trim()) {
        setSuggestion(text.trim());
        setPosition({
          line: cursor.lineNumber,
          column: cursor.column,
        });
      }
    } catch (err) {
      console.error("AI suggestion error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isEnabled, isLoading]);

  const clearDecorations = useCallback((editor: any) => {
    if (editor && decorationIdsRef.current.length > 0) {
      editor.deltaDecorations(decorationIdsRef.current, []);
      decorationIdsRef.current = [];
    }
    setSuggestion(null);
    setPosition(null);
  }, []);

  const acceptSuggestion = useCallback((editor: any, monaco: any) => {
    if (!suggestion || !position || !editor || !monaco) return;

    editor.executeEdits("ai-suggestion", [
      {
        range: new monaco.Range(
          position.line,
          position.column,
          position.line,
          position.column
        ),
        text: suggestion,
        forceMoveMarkers: true,
      },
    ]);

    clearDecorations(editor);
  }, [suggestion, position, clearDecorations]);

  const rejectSuggestion = useCallback((editor: any) => {
    clearDecorations(editor);
  }, [clearDecorations]);

  const setDecorations = useCallback((ids: string[]) => {
    decorationIdsRef.current = ids;
  }, []);

  return {
    suggestion,
    isLoading,
    position,
    isEnabled,
    toggleEnabled,
    fetchSuggestion,
    acceptSuggestion,
    rejectSuggestion,
    clearDecorations,
    setDecorations,
  };
};
