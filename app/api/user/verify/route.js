import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(req) {
  // Get token from cookie ✅
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return NextResponse.json(
      { id: decoded.id, name: decoded.name, email: decoded.email },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }
}
