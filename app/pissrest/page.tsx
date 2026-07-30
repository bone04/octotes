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

export default function PissRestPage() {
  const [token, setToken] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [path, setPath] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token || !owner || !repo || !path) {
      alert("Please fill in all fields");
      return;
    }
    const formData = new FormData(event.target as HTMLFormElement); 
        // Convert FormData to JSON
    const jsonObject: any = {};
    formData.forEach((value, key) => {
    jsonObject[key] = value;
    });


    // onSubmit({ token, owner, repo, path });
    try {
      const response = await fetch("https://bone04.github.io/octotes/api/pissrest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonObject),
      }); 
        if (response.ok) {
          alert("Item today's added successfully!");
          //setFormData({} as FormData);  
          const result = await response.json();
        } else {
          alert("Failed to add item today's.");
        }
    }  catch (error) {  
      console.error("Error adding item today's:", error);
      alert("An error occurred while adding the item today's.");
    } 
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
                  name="token"
                  type="password"
                  value={token}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  onChange={(e) => setToken(e.target.value)} 
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
                    name="owner"
                    type="text"
                    value={owner}
                    placeholder="username or org"
                    onChange={(e) => setOwner(e.target.value)} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
    
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Repository
                  </label>
                  <input
                    name="repo"
                    type="text"
                    value={repo}
                    placeholder="repo-name"
                    onChange={(e) => setRepo(e.target.value)} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
    
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File Path
                  </label>
                  <input
                    name="path"
                    type="text"
                    value={path}
                    placeholder="path/to/file.json"
                    onChange={(e) => setPath(e.target.value)} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >

          button
        </button>
                  
        </form>
      </div>
    </div>
  )

}
