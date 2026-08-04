import { NextResponse, NextRequest } from 'next/server';

export const dynamic = "force-static"

export async function POST(request: NextRequest) {
  // return NextResponse.json({ message: "Hello from Next.js!" });
  try {
    const body = await request.json();

    // Validasi input
    if (!body.token || !body.owner || !body.repo || !body.path) {
      return new Response(
        JSON.stringify({ error: "Token, owner, repo, and path are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Simulasi penyimpanan data (misalnya ke database)
    console.log("Data diterima:", body);

    return new Response(
      JSON.stringify({ message: "Data berhasil diterima", data: body }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON format" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
