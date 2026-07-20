import { Octokit } from "@octokit/core";

export default async function CorezPage() {
  const owner: string = process.env.GITHUB_OWNER || "bone04"
  const repo: string = process.env.GITHUB_REPO || "octotes"
  const path: string = process.env.GITHUB_FILE_PATH || "items.json"
 if (!owner) {
      throw new Error("OWNER environment variable is required.");
    }
  const octokit = new Octokit({
      auth: `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`
        // process.env.GITHUB_TOKEN || `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 `
    });
  
  // Make a REST API request
  const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
          owner: 'bone04',
          repo: 'octotes',
          path: 'items.json',
          headers: {
            'X-GitHub-Api-Version': '2026-03-10'
          }
        })
      // Error [HttpError]: Bad credentials
  /*
      if (Array.isArray(response)) {
        return { message: 'Failed to get data' }
      }
    */
  const nama = response.name;
  console.log("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")
  /*
  if (!response.data) {
    throw new Error('Unauthorized')
  }
 */
  //const name = response.name
  return (

    <>
      <div>
        Halaman Corest Page Test Octokit
      </div>
    </>
  )
}
