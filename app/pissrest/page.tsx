import { Octokit } from "@octokit/rest";

export default async function RestOoPage() {
  const owner: string = process.env.GITHUB_OWNER || "bone04"
  const repo: string = process.env.GITHUB_REPO || "octotes"
  const path: string = process.env.GITHUB_FILE_PATH || "items.json"

  return (

    <div>
      <h1>Ini Halaman Rest Octokit</h1>
    </div>
  )

}
