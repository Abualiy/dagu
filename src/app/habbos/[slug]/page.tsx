import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import HabboView from '@/components/Habbo'
import { storyblokDelivery } from '@/lib/storyblok'


const HabboPage = async ({ params }: { params: { slug: string } }) => {
    const res = await storyblokDelivery.get(`cdn/stories/habbos/${params.slug}`);
    const post = res.data.story;
    

    if (!post) return <p className="text-center text-red-600 mt-10">Post not found.</p>

    return (
        <div>
            <Nav />
            <HabboView post={post} />
            <Footer />
        </div>
    )
}

export default HabboPage
