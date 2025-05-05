import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import User from '@/app/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(req) {
  await connectDB()
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 }
    )
  }

  // Find user
  const user = await User.findOne({ email })
  console.log(user)
  if (!user) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    )
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
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

  cookies().set('token', token, {
    httpOnly: true,
    maxAge: 3600,
    path: '/',
  })

  NextResponse.json({ message: 'Login successful' })

  return NextResponse.json({ token, user }, { status: 200 })
}
