import { NextResponse } from 'next/server';

// Handle the GET request
export async function GET() {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  // Return the data as JSON
  return NextResponse.json(users);
}
