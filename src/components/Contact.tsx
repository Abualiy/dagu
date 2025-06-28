import Image from 'next/image'
import React from 'react'

const Contact = () => {
  return (
    <div id='contact'  className='m-10 p-5 flex flex-col items-center'>
      <h1 className='text-3xl font-bold text-[#974900]'>Contact me</h1>
      <div className='mt-4 flex gap-5'>
        <a href="https://www.instagram.com/abualiy_ak" target='_blank'>
            <Image src="/icons/instagram.png" width={'50'} height={'50'} alt='icon'></Image>
        </a>
        <a href="https://t.me/abualiy2" target='_blank'>
            <Image src="/icons/telegram.png" width={'50'} height={'50'} alt='icon'></Image>
        </a>
        <a href="https://x.com/abualiy_ak?s=35" target='_blank'>
            <Image src="/icons/twitter.png" width={'50'} height={'50'} alt='icon'></Image>
        </a>
        <a href="https://wa.me/qr/WGTXD22SEO4HG1" target='_blank'>
            <Image src="/icons/whatsapp.png" width={'50'} height={'50'} alt='icon'></Image>
        </a>
        <a href="https://github.com/Abualiy" target='_blank'>
            <Image src="/icons/github-sign.png" width={'50'} height={'50'} alt='icon'></Image>
        </a>
        <a href="https://akremmuktar.vercel.app" target='_blank'>
            <Image src="/icons/portfolio.png" width={'50'} height={'50'} alt='icon'></Image>
        </a>
      </div>
    </div>
  )
}

export default Contact
