import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://product-assignment-amber.vercel.app',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  })
}

export async function GET(req) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      {
        status: 401,
        headers: {
          'Access-Control-Allow-Origin': 'https://product-assignment-amber.vercel.app',
        },
      }
    )
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return NextResponse.json(
      { id: decoded.id, name: decoded.name, email: decoded.email },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': 'https://product-assignment-amber.vercel.app',
        },
      }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Invalid token' },
      {
        status: 401,
        headers: {
          'Access-Control-Allow-Origin': 'https://product-assignment-amber.vercel.app',
        },
      }
    )
  }
}
