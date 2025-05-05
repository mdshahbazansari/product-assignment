import User from '@/app/models/User'
import { connectDB } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

// ✅ Handle OPTIONS (for CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://product-assignment-amber.vercel.app',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

// ✅ Handle POST (signup)
export async function POST(req) {
  await connectDB()

  try {
    const { name, email, mobile, password } = await req.json()

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': 'https://product-assignment-amber.vercel.app',
          },
        }
      )
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // ✅ Create new user
    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
    })

    await newUser.save()

    return NextResponse.json(
      { message: 'User registered successfully' },
      {
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': 'https://product-assignment-amber.vercel.app',
        },
      }
    )
  } catch (error) {
    console.error('Signup Error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': 'https://product-assignment-amber.vercel.app',
        },
      }
    )
  }
}
