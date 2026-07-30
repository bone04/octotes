import { NextRequest, NextResponse } from "next/server";
// import { Octokit } from "@octokit/core";
import { Octokit } from "@octokit/rest";

export async function POST(request: NextRequest) {
  try {
    const { token, owner, repo, path } = await request.json();

    if (!token || !owner || !repo || !path) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const octokit = new Octokit({ auth: token });
    console.log("Received request with token:", token, "owner:", owner, "repo:", repo, "path:", path);
    return NextResponse.json({
       message: `Hello, ${token}!`,
      /*
      name: response.data.name,
      path: response.data.path,
      sha: response.data.sha,
      size: response.data.size,
      type: response.data.type,
      */
      // content: response.data.content,
      // encoding: response.data.encoding,
    });
  } catch (error: any) {
    console.error("Error fetching file:", error);

    if (error.status === 401) {
      return NextResponse.json(
        { error: "Invalid GitHub token" },
        { status: 401 }
      );
    }

    if (error.status === 404) {
      return NextResponse.json(
        { error: "File or repository not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to fetch file" },
      { status: 500 }
    );
  }
}
