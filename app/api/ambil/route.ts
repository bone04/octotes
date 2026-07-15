import { NextResponse } from "next/server";
import { Octokit } from "@octokit/core";

export const dynamic = 'force-static'

export async function GET() {
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
      
 console.log(`Success! Status: ${result.status}. Rate limit remaining: ${result.headers["x-ratelimit-remaining"]}`)

} catch (error) {
    console.log(error.message); 
  // console.log(`Error! Status: ${error.status}. Rate limit remaining: ${error.headers["x-ratelimit-remaining"]}. Message: ${error.response.data.message}`)
}
  
return NextResponse.json({ message: "Data received" });
}
