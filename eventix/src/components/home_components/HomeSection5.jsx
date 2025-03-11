import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "I Was Fully Blown Away!",
    text: "Paste your reviews here and try to keep them all the same length. People don't like to read super long reviews anyways! Discover the magic of moments captured through our lenses. Our photography website template is a symphony of visual storytelling, where every pixel whispers tales of beauty, love, and artistry.",
    author: "LOVE NOTE FROM SAMMY + LIAM"
  },
  {
    quote: "Her Work Is Magical",
    text: "Paste your reviews here and try to keep them all the same length. People don't like to read super long reviews anyways! Discover the magic of moments captured through our lenses. Our photography website template is a symphony of visual storytelling, where every pixel whispers tales of beauty, love, and artistry.",
    author: "LOVE NOTE FROM SAMMY + LIAM"
  }
];

export default function HomeSection5() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-[#F9F7F3] flex items-center justify-center p-10 relative">
      <button onClick={prevSlide} className="absolute left-5 bg-[#F1ECE3] p-3 rounded">
        ←
      </button>
      <div className="text-center max-w-2xl">
        <div className="text-6xl text-gray-500">&ldquo;</div>
        <h2 className="text-5xl font-serif text-gray-700 italic">{testimonials[currentIndex].quote}</h2>
        <p className="mt-4 text-gray-600">{testimonials[currentIndex].text}</p>
        <p className="mt-6 font-semibold text-gray-500">{testimonials[currentIndex].author}</p>
      </div>
      <button onClick={nextSlide} className="absolute right-5 bg-[#F1ECE3] p-3 rounded">
        →
      </button>
    </div>
  );
}
