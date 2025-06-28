'use client'

import { useUser } from '@/lib/useUser'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menubar, MenubarTrigger, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator } from './ui/menubar'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Menu, X } from 'lucide-react'

const Nav = () => {
  const { user, loading } = useUser()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast("Logout Successfully!", {
      description: "You can login again, or back to home page by clicking the logo!"
    })
    router.replace('/login')
    
  }

  const handleProfile = (e) => {
    e.preventDefault();
    if (user) {
      const url = `/profile?name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`
      router.push(url)
    }
  }

  if (loading) return <p className="text-white">Loading...</p>

  return (
    <header className="w-full h-[10vh] flex items-center justify-between px-4 md:px-12 dagu-bg relative z-50">
      <Link href={'/'} className='-rotate-5'>
        <Image src={'/images/dagu-logo.png'} width={100} height={50} alt='dagu-logo' />
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-6 items-center font-bold">
        <Link href={'/habbos'} className='text-[#1A1A1A] text-2xl hover:underline'>Habbo</Link>
        <Link href={'/#about'} className='text-lg'>About</Link>
        <Link href={'/#contact'} className='text-lg'>Contact</Link>

        {user ? (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>{user.name?.split(' ')[0]}</MenubarTrigger>
              <MenubarContent>
                <MenubarItem className='hover:cursor-pointer hover:bg-gray-700 hover:text-white' inset onClick={() => router.push('/create-post')}>
                  + Create Habbo
                </MenubarItem>
                <MenubarItem className='hover:cursor-pointer hover:bg-gray-700 hover:text-white' inset onClick={handleProfile}>
                  👤 Profile
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem className='hover:cursor-pointer hover:bg-gray-700 hover:text-white'  inset onClick={handleLogout}>
                  🔒 Logout
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ) : (
          <Link href={'/login'} className='text-blue-600 underline'>Login / Signup</Link>
        )}
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-xl py-4 px-6 flex flex-col gap-4 md:hidden font-medium">
          <Link href="/habbos" onClick={() => setMobileMenuOpen(false)}>Habbo</Link>
          <Link href="/#about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

          {user ? (
            <Menubar className='w-fit'>
              <MenubarMenu>
                <MenubarTrigger>{user.name?.split(' ')[0]}</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem inset onClick={() => router.push('/create-post')}>
                    + Create Habbo
                  </MenubarItem>
                  <MenubarItem inset onClick={() => router.push('/profile')}>
                    👤 Profile
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem inset onClick={handleLogout}>
                    🔒 Logout
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <Link href="/login" className="text-blue-600 underline" onClick={() => setMobileMenuOpen(false)}>
              Login / Signup
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

export default Nav
