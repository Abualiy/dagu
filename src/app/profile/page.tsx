import Footer from '@/components/Footer'
import MyPost from '@/components/MyPost'
import Nav from '@/components/Nav'
import { myPosts } from '@/lib/api'

interface ProfilePageProps {
  searchParams: { name?: string, email?: string }
}

const ProfilePage = async ({ searchParams }: ProfilePageProps) => {
  const user = searchParams.name || '';
  const email = searchParams.email || '';

  const posts = await myPosts(user)

  return (
    <div>
      <Nav />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-orange-700 mb-2">👤 Your Profile</h1>
        <p className="text-gray-700 mb-1">Full Name: {user}</p>
        <p className="text-gray-700 mb-6">Email: {email}</p>

        <h2 className="text-2xl font-semibold mb-4">📝 Your Habbos</h2>
        <MyPost posts={posts} />
      </div>
      <Footer />
    </div>
  )
}

export default ProfilePage
