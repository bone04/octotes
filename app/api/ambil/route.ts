
import { NextResponse } from "next/server";
// import { Octokit } from "@octokit/rest";
import { Octokit } from "@octokit/core";

export const dynamic = 'force-static';
// https://raw.githubusercontent.com/bone04/learn-octo/main/items.json

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
 const  { data }  = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
  owner,
  repo,
  path,
  headers: {
    'X-GitHub-Api-Version': '2026-03-10'
  }
})
  
  
  if (!Array.isArray(data)) return [];
  
  /*
  if (!Array.isArray(data)) { // Filter out directories

    if (data.type === 'file') { // Make sure it's a file
      data.content;
    }
  }
  */
  /*
    if (!Array.isArray(data) && data.content) {
      const content = Buffer.from(data.content, "base64").toString("utf8");
      console.log(content);
      }
  */
return NextResponse.json({ message: "Data received" });
}
