import React from 'react'
import heroImg from '../../assets/rabbit-hero.webp'
import heroImg1 from '../../assets/heroImg.jpg'
import { Link } from 'react-router-dom'


const Hero = () => {
  return (
    <section className='relative'>
      <img
        src={heroImg1}
        alt="Vacation"
        className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'
      />
      <div className='absolute inset-0 bg-black/20 flex items-center justify-center'>
        <div className='text-center text-white p-6'>
          <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>
            Vacation <br />Ready
          </h1>
          <p className='text-sm tracking-tighter md:text-lg mb-6'>Explore our vacation ready Outfits </p>
          <Link to='#' className='bg-white px-6 py-2 text-black rounded-lg text-lg'>Shop Now</Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
