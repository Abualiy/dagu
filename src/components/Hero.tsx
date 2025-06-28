import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className="hero-bg bg-cover bg-center text-white py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-left space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Dagu — A blog website inspired by Afar traditional information system
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl">
          An Afar knowledge-sharing tradition reimagined for the web. Share and discover real-time <strong>Habbo</strong> (messages) across regions.
        </p>
        <Link
          href="/habbos"
          className="inline-block bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded text-white font-semibold transition duration-200"
        >
          Explore Habbo
        </Link>
      </div>
    </section>
  )
}

export default Hero
