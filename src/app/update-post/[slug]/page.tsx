import { storyblokDelivery } from '@/lib/storyblok'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import UpdateForm from '@/components/UpdateForm';

export default async function EditHabbo({ params }: { params: { slug: string } }) {
  const res = await storyblokDelivery.get(`cdn/stories/habbos/${params.slug}`);
  const post = res.data.story;
  

  return (
    <div>
      <Nav />
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-orange-700 mb-4">✏️ Edit Your Habbo</h1>
        <UpdateForm post={post}/>
      </div>
      <Footer />
    </div>
  )
}
