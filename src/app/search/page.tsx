import Footer from '@/components/Footer';
import HabboCard from '@/components/HabboCard';
import Nav from '@/components/Nav';
import SearchFilter from '@/components/SearchFilter';
import { searchPosts } from '@/lib/api';
import React from 'react'

interface SearchProps {
    searchParams: { search?: string }
}

const Search = async ({ searchParams }: SearchProps) => {
    const keyword = searchParams.search || '';
    const posts = await searchPosts("keyword")

    return (
        <div>
            <Nav />
            <div className='min-h-[85vh]'>
                <SearchFilter />
                {
                    posts.length <= 0 ? <h1  >There is no similar habbos!</h1> : <HabboCard posts={posts} />
                }
            </div>
            <Footer />
        </div>
    )
}

export default Search
