'use client'
import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message as antdMessage,
} from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useMessage } from 'antd/es/message/useMessage'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

const { Title } = Typography

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [message, contextHolder] = antdMessage.useMessage()

  const signup = async (values) => {
    setLoading(true)
    try {
      const response = await axios.post('/api/user/signup', values)
      message.success('Signup successful!')
      router.push('/login')
    } catch (error) {
      message.error(error.response.data.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {contextHolder} {/* Render message context */}
      <div className='flex justify-center items-center'>
        <Card className='w-96 shadow-lg rounded-lg p-6'>
          <Title level={3} className='text-center'>
            Signup
          </Title>
          <Form
            name='signup'
            onFinish={signup}
            layout='vertical'
            requiredMark={false}
          >
            <Form.Item
              label='Full Name'
              name='name'
              rules={[
                { required: true, message: 'Please enter your full name!' },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder='Enter your name' />
            </Form.Item>

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
              label='Mobile Number'
              name='mobile'
              rules={[
                { required: true, message: 'Please enter your mobile number!' },
              ]}
            >
              <Input placeholder='Enter your mobile number' />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                { required: true, message: 'Please enter your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
              ]}
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
                Signup
              </Button>
            </Form.Item>
          </Form>
          <p className='font-semibold'>
            Already have an account?{' '}
            <Link href='/login' className='text-blue-500'>
              Login
            </Link>
          </p>
        </Card>
      </div>
    </>
  )
}

export default Signup
