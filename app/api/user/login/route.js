import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import User from '@/app/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function OPTIONS() {
  return NextResponse.json(
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin':
          'https://product-assignment-amber.vercel.app',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  )
}

export async function POST(req) {
  await connectDB()
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin':
            'https://product-assignment-amber.vercel.app',
        },
      }
    )
  }

  // Find user
  const user = await User.findOne({ email })
  console.log(user)
  if (!user) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      {
        status: 401,
        headers: {
          'Access-Control-Allow-Origin':
            'https://product-assignment-amber.vercel.app',
        },
      }
    )
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      {
        status: 401,
        headers: {
          'Access-Control-Allow-Origin':
            'https://product-assignment-amber.vercel.app',
        },
      }
    )
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  )

  // Set cookie
  cookies().set('token', token, {
    httpOnly: true,
    maxAge: 3600,
    path: '/',
  })

  // ✅ Return with CORS header
  return NextResponse.json(
    { message: 'Login successful', token, user },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin':
          'https://product-assignment-amber.vercel.app',
      },
    }
  )
}
