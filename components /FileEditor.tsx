"use client";

import { useState, useEffect } from "react";

interface FileEditorProps {
  fileData: {
    name: string;
    path: string;
    content: string;
    owner: string;
    repo: string;
  };
  onSave: (content: string) => void;
  loading: boolean;
}

export default function FileEditor({
  fileData,
  onSave,
  loading,
}: FileEditorProps) {
  const [content, setContent] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const decoded =
        typeof fileData.content === "string"
          ? atob(fileData.content)
          : fileData.content;
      setContent(decoded);
      setHasChanges(false);
      setError(null);
    } catch (err) {
      setError("Error decoding file content");
    }
  }, [fileData.content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setHasChanges(true);
    setError(null);
  };

  const validateJson = () => {
    try {
      JSON.parse(content);
      return true;
    } catch {
      return false;
    }
  };

  const handleSave = () => {
    if (!validateJson()) {
      setError("Invalid JSON format");
      return;
    }
    onSave(content);
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(content);
      setContent(JSON.stringify(parsed, null, 2));
      setHasChanges(true);
      setError(null);
    } catch {
      setError("Invalid JSON format - cannot format");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{fileData.name}</h3>
          <p className="text-sm text-gray-600">{fileData.path}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleFormat}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors font-medium text-sm"
          >
            Format
          </button>
          <button
            onClick={handleSave}
            disabled={loading || !hasChanges || !validateJson()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-700 text-sm">
          {error}
        </div>
      )}

      {!validateJson() && content && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-700 text-sm">
          ⚠️ Invalid JSON - fix errors before saving
        </div>
      )}

      {hasChanges && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-700 text-sm">
          You have unsaved changes
        </div>
      )}

      <textarea
        value={content}
        onChange={handleChange}
        disabled={loading}
        className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none json-editor"
        placeholder="Paste your JSON here..."
      />

      <div className="text-xs text-gray-500">
        {content.split("\n").length} lines • {content.length} characters
      </div>
    </div>
  );
}
