import { Octokit } from "@octokit/rest";

export default async function CorezPage() {
  const owner: string = process.env.GITHUB_OWNER || "bone04"
  const repo: string = process.env.GITHUB_REPO || "octotes"
  const path: string = process.env.GITHUB_FILE_PATH || "items.json"
 if (!owner) {
      throw new Error("OWNER environment variable is required.");
    }
  const octokit = new Octokit({
      auth: "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"
        // process.env.GITHUB_TOKEN || `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 `
    });
  
  // Make a REST API request
  // 'GET /repos/{owner}/{repo}/contents/{path}',
  type Data = {
    name: string;
  }
  const  { data } = await octokit.rest.repos.getContent( {
          owner: 'bone04',
          repo: 'octotes',
          path: 'items.json',
          headers: {
            'X-GitHub-Api-Version': '2026-03-10'
          }
        });
  if (!Array.isArray(data)) { // Filter out directories

    if (data.type === 'file') { // Make sure it's a file
      data.content;
    }
  }
      // Error [HttpError]: Bad credentials
  // const akuData = akuResponse.type;
// const dataName = akuResponse.data.name;
  /*
      if (Array.isArray(response)) {
        return { message: 'Failed to get data' }
      }
    */// Correctly access the property

  // const branch_git = akuResponse as OctokitResponse<{ name: string; commit: { sha: string; url: string } }>;
  
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
