import { Octokit } from "@octokit/rest";

export default async function CorezPage() {
  const owner: string = process.env.GITHUB_OWNER || "bone04"
  const repo: string = process.env.GITHUB_REPO || "octotes"
  const path: string = process.env.GITHUB_FILE_PATH || "items.json"
 if (!owner) {
      throw new Error("OWNER environment variable is required.");
    }
  const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN || undefined
    });
  
  // Make a REST API request
  
       const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
          owner,
          repo,
          path,
          headers: {
            'X-GitHub-Api-Version': '2026-03-10'
          },
         mediaType: {
            format: "raw", 
          },
        })
      // Error [HttpError]: Bad credentials
      if (Array.isArray(response.data)) {
        console.log("Path is a directory, not a file"}
    }

    // console.log(result.type)
 
  // const name = response.data.name
  return (

    <>
      <div>
        Halaman Corez Page Test Octokit
      </div>
    </>
  )
}
