import { Octokit } from "@octokit/rest";

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
  // 'GET /repos/{owner}/{repo}/contents/{path}',
  type Data = {
    name: string;
  }
  const akuResponse = await octokit.rest.repos.getContent( {
          owner: 'bone04',
          repo: 'octotes',
          path: 'items.json',
          headers: {
            'X-GitHub-Api-Version': '2026-03-10'
          }
        })
      // Error [HttpError]: Bad credentials
  const akuData = akuResponse.type;
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
