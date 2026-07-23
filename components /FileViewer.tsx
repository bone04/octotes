"use client";

import { useMemo } from "react";

interface FileViewerProps {
  fileData: {
    name: string;
    path: string;
    content: string;
    owner: string;
    repo: string;
  };
}

export default function FileViewer({ fileData }: FileViewerProps) {
  const formattedJson = useMemo(() => {
    try {
      const decoded =
        typeof fileData.content === "string"
          ? atob(fileData.content)
          : fileData.content;
      return JSON.stringify(JSON.parse(decoded), null, 2);
    } catch {
      return "Error parsing JSON";
    }
  }, [fileData.content]);

  const githubUrl = `https://github.com/${fileData.owner}/${fileData.repo}/blob/main/${fileData.path}`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold">{fileData.name}</h3>
        <p className="text-sm text-gray-600">{fileData.path}</p>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
        >
          Open on GitHub →
        </a>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto json-editor">
        <pre className="text-gray-100 text-sm whitespace-pre-wrap break-words">
          {formattedJson}
        </pre>
      </div>
    </div>
  );
}
