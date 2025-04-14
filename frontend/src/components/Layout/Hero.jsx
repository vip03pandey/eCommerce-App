import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroImg1 from '../../assets/rabbit-hero.webp';
import heroImg2 from '../../assets/heroImg.jpg';
import heroImg3 from '../../assets/hero3.jpg';

const slides = [
  {
    img: heroImg1,
    heading: 'Vacation Ready',
    text: 'Explore our vacation ready Outfits',
  },
  {
    img: heroImg2,
    heading: 'Adventure Awaits',
    text: 'Get geared up for your next journey',
  },
  {
    img: heroImg3,
    heading: 'Office Wear',
    text: 'Get geared up for your next journey',
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);
  const slideRef = useRef(null);
  const fullSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const nextSlide = () => {
    setCurrent((prev) => prev + 1);
    setTransition(true);
  };

  const prevSlide = () => {
    setCurrent((prev) => prev - 1);
    setTransition(true);
  };

  useEffect(() => {
    let timer;

    const startSlider = () => {
      timer = setInterval(() => {
        nextSlide();
      }, 5000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(timer);
      } else {
        startSlider();
      }
    };

    startSlider();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!transition) return;

    const handleTransitionEnd = () => {
      if (current === fullSlides.length - 1) {
        setTransition(false);
        setCurrent(1);
      } else if (current === 0) {
        setTransition(false);
        setCurrent(fullSlides.length - 2);
      }
    };

    const node = slideRef.current;
    node.addEventListener('transitionend', handleTransitionEnd);
    return () => node.removeEventListener('transitionend', handleTransitionEnd);
  }, [current, transition, fullSlides.length]);

  const slideStyle = {
    transform: `translateX(-${current * 100}%)`,
    transition: transition ? 'transform 0.7s ease-in-out' : 'none',
  };

  return (
    <section className="relative overflow-hidden h-[400px] md:h-[600px] lg:h-[750px]">
      <div ref={slideRef} className="flex h-full" style={slideStyle}>
        {fullSlides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative h-full">
            <img src={slide.img} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
              <div className="text-center text-white p-6">
                <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
                  {slide.heading.split(' ')[0]} <br />
                  {slide.heading.split(' ')[1]}
                </h1>
                <p className="text-sm tracking-tighter md:text-lg mb-6">{slide.text}</p>
                <Link
                  to="/shop"
                  className="bg-white px-6 py-2 text-black rounded-lg text-lg"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 text-white p-2 rounded-full z-30 hover:bg-white/50"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        disabled={current === fullSlides.length - 1}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 text-white p-2 rounded-full z-30 hover:bg-white/50"
      >
        ❯
      </button>
    </section>
  );
};

export default Hero;
