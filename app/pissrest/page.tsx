"use client";
// import { Octokit } from "@octokit/rest";
import { useState } from "react";

interface FileFormProps {
  onSubmit: (data: {
    token: string;
    owner: string;
    repo: string;
    path: string;
  }) => void;
  loading: boolean;
}

export default async function RestOoPage() {
  const [token, setToken] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [path, setPath] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !owner || !repo || !path) {
      alert("Please fill in all fields");
      return;
    }

    // onSubmit({ token, owner, repo, path });
  };
  
  return (

    <div>
      <h1>Ini Halaman Rest Octokit</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Token (Personal Access Token)
                </label>
                <input
                  type="password"
                  value={token}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Create a token at github.com/settings/tokens
                </p>
              </div>
    
              
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner
                  </label>
                  <input
                    type="text"
                    value={owner}
                    placeholder="username or org"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
    
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Repository
                  </label>
                  <input
                    type="text"
                    value={repo}
                    placeholder="repo-name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
    
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File Path
                  </label>
                  <input
                    type="text"
                    value={path}
                    placeholder="path/to/file.json"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
            </div>

            <button
              type="submit"
\              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >

          button
        </button>
                  
        </form>
      </div>
    </div>
  )

}
