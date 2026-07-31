// https://github.com/copilot/c/be498174-20c2-43b7-beb8-d437b11d46da

import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    info: 'POST JSON to this endpoint. It will echo back the received payload.',
    example: { hello: 'world' },
  });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // simple server-side validation can be done here if you want
    return NextResponse.json({
      ok: true,
      message: 'Data received',
      received: data,
      receivedAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body' },
      { status: 400 }
    );
  }
}