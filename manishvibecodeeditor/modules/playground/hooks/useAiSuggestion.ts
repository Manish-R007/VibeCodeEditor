"use client";

import { useState, useCallback, useRef } from "react";

export const useAISuggestions = () => {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const lastContextRef = useRef("");

  const fetchSuggestion = useCallback(async (editor: any) => {
    if (!editor || isLoading) return;

    const model = editor.getModel();
    const cursor = editor.getPosition();
    if (!model || !cursor) return;

    const fullText = model.getValue();
    const offset = model.getOffsetAt(cursor);

    const prefix = fullText.slice(0, offset);
    const suffix = fullText.slice(offset);

    const contextKey = prefix.slice(-250) + "||" + suffix.slice(0, 80);
    if (contextKey === lastContextRef.current) return;

    lastContextRef.current = contextKey;
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

      const data = await res.json();
      const text = data.completion?.trim();

      if (text) {
        setSuggestion(text);
      } else {
        setSuggestion(null);
      }
    } catch (err) {
      console.error("AI error", err);
      setSuggestion(null);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearSuggestion = useCallback(() => {
    setSuggestion(null);
    lastContextRef.current = "";
  }, []);

  return {
    suggestion,
    isLoading,
    fetchSuggestion,
    clearSuggestion,
  };
};
