import mongoose from 'mongoose'

const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://localhost:27017/smartdelivery'

if (!MONGO_URL) {
  throw new Error('Please define the MONGO_URL environment variable')
}

let isConnected = false

export const connectDB = async () => {
  if (isConnected) {
    console.log('✅ Using existing database connection')
    return
  }

  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true
    console.log('✅ MongoDB Connected')
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error)
    throw error
  }
}
