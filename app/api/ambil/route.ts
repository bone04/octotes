// app/api/hello/route.ts
import { NextResponse } from 'next/server';
const dynamic = "force-static"

export async function GET() {
  const data = { message: "Hello, world!" };
  
  return NextResponse.json(data);
}
