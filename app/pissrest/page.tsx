"use client";
// import { Octokit } from "@octokit/rest";
import React, { useState } from "react";

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
 const [formData, setFormData] = useState({ token: '', owner: '', repo: '', path: '' });
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

   // Handle input changes 
  const handleChange = (event?:any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
      formData.append('token', formData.get('token') as string );
      formData.append('owner', formData.get('owner') as string );
      formData.append('repo', formData.get('repo') as string );    
      formData.append('path', formData.formData.get('path') as string );
      formData.append('branch', 'main');
    
    if (!formData.token || !formData.owner || !formData.repo || !formData.path) {
      alert("Please fill in all fields");
      return;
    }
    // onSubmit({ token, owner, repo, path });
// Use your own instance or the hosted version
const response = await fetch('https://picser.pages.dev/api/public-upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result);

// Or use hosted version directly:
// const response = await fetch('https://picser.pages.dev/api/public-upload', {...});
    try {
      const response = await fetch(`/api/pissrest`, {
        method: "PUT",
        headers: {
          'Authorization': 'Bearer YOUR_GITHUB_TOKEN',
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28' // Recommended header
        },
        body: JSON.stringify(formData),
      }); 
      const data = await response.json();
        if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      setStatus(data.message);
      setFormData({ token: '', owner: '', repo: '', path: ''  }); // Reset form
    }  catch (error: any) {      
      //setStatus(`Error: ${error.message}`);
      //setError(error.message);
      alert(`An error occurred ${error.message}`); //  ${formData.token} 
      return { success: false, error: error.message || 'Failed to create user.' };
      // setError(error instanceof Error ? error.message : "An error occurred");
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
                  value={formData.token}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  onChange={handleChange} 
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
                    value={formData.owner}
                    placeholder="username or org"
                    onChange={handleChange} 
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
                    value={formData.repo}
                    placeholder="repo-name"
                    onChange={handleChange} 
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
                    value={formData.path}
                    placeholder="path/to/file.json"
                    onChange={handleChange} 
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
