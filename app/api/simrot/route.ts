import { NextResponse, NextRequest } from 'next/server';

export const dynamic = "force-static"

export async function POST(request: Request) {
  return NextResponse.json({ message: "Hello from Next.js!" });
}
