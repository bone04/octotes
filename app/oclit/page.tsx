"use client";

import { useState } from "react";
import FileForm from "@/components/FileForm";
// import FileEditor from "@/components/FileEditor";
// import FileViewer from "@/components/FileViewer";

interface FileData {
  name: string;
  path: string;
  sha: string;
  content: string;
  owner: string;
  repo: string;
}

export default function Home() {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [view, setView] = useState<"viewer" | "editor">("viewer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (data: {
    token: string;
    owner: string;
    repo: string;
    path: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/github/get-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch file");
      }

      const result = await response.json();
      setFileData({
        ...result,
        owner: data.owner,
        repo: data.repo,
      });
      setView("viewer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setFileData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFile = async (content: string) => {
    if (!fileData) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/github/update-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner: fileData.owner,
          repo: fileData.repo,
          path: fileData.path,
          content,
          sha: fileData.sha,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save file");
      }

      const result = await response.json();
      setFileData({
        ...fileData,
        content,
        sha: result.sha,
      });
      setView("viewer");
      alert("File saved successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Load GitHub File</h2>
        <FileForm onSubmit={handleFileSelect} loading={loading} />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {fileData && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setView("viewer")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === "viewer"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              View
            </button>
            <button
              onClick={() => setView("editor")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === "editor"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Edit
            </button>
          </div>

          {view === "viewer" && <FileViewer fileData={fileData} />}
          {view === "editor" && (
            <FileEditor
              fileData={fileData}
              onSave={handleSaveFile}
              loading={loading}
            />
          )}
        </div>
      )}

      {!fileData && !error && (
        <div className="bg-gray-100 rounded-lg p-12 text-center">
          <p className="text-gray-600">
            Load a GitHub file to view and edit it
          </p>
        </div>
      )}
    </div>
  );
}
