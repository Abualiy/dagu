import { LoginForm } from '@/components/LoginForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div className="dagu-bg w-full min-h-screen overflow-hidden flex flex-col justify-between px-4 py-6">
      {/* Logo */}
      <div className='h-[10%] rotate-[-2deg]'>
        <Link href="/">
          <Image src="/images/dagu-logo.png" width={150} height={50} alt="dagu-logo" />
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col mt-4 lg:flex-row items-center justify-evenly flex-1 gap-10 lg:gap-0">
        {/* Text Section */}
        <div className="w-full lg:w-2/5 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-[#3B2F2F] caprasimo">
            Welcome to Dagu
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 text-[#F5F5DC]">
            “Truth flows through words - become a voice”
          </p>
          <div className="text-[#F5F5DC] space-y-1 text-lg sm:text-xl">
            <p>🪶 “Dagu is not a rumor, it is truth.”</p>
            <p>Afar saying</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login
