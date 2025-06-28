import React from 'react'
import { Card } from './ui/card'

const About = () => {
  return (
    <Card id="about" className="m-6 sm:m-10 p-6 sm:p-10 bg-white">
      <h1 className="text-3xl font-bold text-[#974900] mb-6 ">About</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* What is Dagu? */}
        <div className="md:w-1/2 p-4 border-b-2 md:border-b-0 md:border-r-2 border-[#974900]">
          <h2 className="text-2xl font-bold mb-2 text-[#333]">What is Dagu?</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>Dagu</strong> is the traditional Afar system of sharing truthful, timely, and essential information. 
            Passed orally through communities, it serves as a lifeline in the desert—helping people navigate survival, weather, health, conflict, and social changes. 
            In Afar culture, Dagu is more than news — it&apos;s a moral responsibility to speak only what is true and useful.
          </p>
        </div>

        {/* What is the idea of this website? */}
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-2 text-[#333]">What is the idea of this website?</h2>
          <p className="text-gray-700 leading-relaxed">
            This platform brings the spirit of <strong>Dagu</strong> into the digital world. 
            Here, users can share and discover “Habbos” — posts inspired by traditional Afar messages — in a respectful, community-driven space. 
            It&apos;s a modern tool to preserve indigenous knowledge, promote truth, and empower Afar voices across borders. 
            With features like user authentication, post creation, search, likes, and comments, the Dagu system is reborn for the web.
          </p>
        </div>
      </div>
    </Card>
  )
}

export default About
