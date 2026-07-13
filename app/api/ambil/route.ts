// app/api/hello/route.ts
import { NextResponse } from 'next/server';
export const dynamic = "force-dynamic"

export async function GET() {
  const data = { message: "Hello, world!" };
  
  return NextResponse.json(data);
}
