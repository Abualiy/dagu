import Footer from '@/components/Footer'
import HabboCard from '@/components/HabboCard'
import Nav from '@/components/Nav'
import SearchFilter from '@/components/SearchFilter'
import { fetchAllPosts } from '@/lib/api'
import React from 'react'


const Habbo = async () => {
  const habbos = await fetchAllPosts();

  return (
    <div>
      <Nav />
      <main>
        <SearchFilter />
        <HabboCard posts={habbos} />
      </main>
      <Footer />
    </div>
  )
}

export default Habbo
