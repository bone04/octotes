import { Octokit } from "@octokit/core";

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
  try {
       const  result   = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
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
    // console.log(result.type)
  //  console.log(Array.isArray(result));
 // console.log(`Success! Status: ${result.status}. Rate limit remaining: ${result.headers["x-ratelimit-remaining"]}`)
    // const content = Buffer.from(result._links.self, 'base64').toString() // result.data.content
    // console.log(content)

} catch (err) {
    if (typeof err === 'object' && err !== null) {
      console.log(err.toString());
    } else {
      console.log('Unexpected error', err);
    }
  // console.log(`Error! Status: ${error.status}. Rate limit remaining: ${error.headers["x-ratelimit-remaining"]}. Message: ${error.response.data.message}`)
}
  //message: "Data received"

  return (

    <>
      <div>
        Halaman Corez Page Test Octokit
      </div>
    </>
  )
}
