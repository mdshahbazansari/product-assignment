'use client'
import React, { useState } from 'react'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'


const { Title } = Typography

const Login = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const login = async (values) => {
    setLoading(true)
    try {
      await axios.post('/api/user/login', values, { withCredentials: true })
      router.push('/product')
      message.success('Login successful!')
    } catch (error) {
      message.error('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <Card className='w-96 shadow-lg rounded-lg '>
        <Title level={3} className='text-center'>
          Login
        </Title>
        <Form
          name='login'
          onFinish={login}
          layout='vertical'
          requiredMark={true}
        >
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Enter a valid email!' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder='Enter your email' />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder='Enter your password'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              block
              loading={loading}
              className='bg-blue-500'
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <p className='font-semibold'>
          Don't have an account ?
          <Link href='/signup' className='text-blue-500'>
            Signup
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default Login
