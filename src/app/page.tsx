'use client'
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";


export default function Home() {

  return (
    <div>
      <Nav />
      <main className="max-w-screen min-h-[85vh]">
        <Hero />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
