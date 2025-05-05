import { NextResponse } from 'next/server'

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://product-assignment-amber.vercel.app',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  })
}

export async function POST() {
  const response = NextResponse.json(
    { message: 'Logged out' },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://product-assignment-amber.vercel.app',
      },
    }
  )

  response.cookies.set('token', '', {
    maxAge: 0,
    path: '/',
  })

  return response
}
