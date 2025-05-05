
import Product from '@/components/Product'
import { connectDB } from '@/lib/db'

export default function Home() {
  connectDB()
  return (
    <div>
      <Product />
    </div>
  )
}
