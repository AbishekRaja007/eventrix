import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from "../../assets/images/dog.jpg";
import image2 from "../../assets/images/rolex.jpg";
import image3 from "../../assets/images/peach.jpg";
import image4 from "../../assets/images/peach2.jpg";

const testimonials = [
  {
    text: "Yielding bearing give replenish one tree firmament lesser winged morning gathered. Yielding yielding don’t set fill bearing us earth. Green midst let fly after abundantly itself likeness likeness seas divided creature made won’t cattle.",
    author: "Katerina M."
  },
  // Add more testimonials if needed
];

const images = [image1, image2, image3, image4];;

const ContactUsSection4 = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-[#e6d7cb] pt-16 px-4 text-center h-[865px]">
      {/* References Section */}
      <div className="relative bg-[#e6d7cb] pt-16 pb-8 px-6 w-[900px] h-[800px] mx-auto rounded-t-[50%] border-1 border-white">
        <h2 className="text-4xl font-serif pt-28 text-gray-800">References</h2>
        <p className="text-gray-600 mt-4 mx-32">{testimonials[currentTestimonial].text}</p>
        <p className="mt-4 font-semibold">{testimonials[currentTestimonial].author}</p>
        <div className="flex justify-center mt-4 space-x-4">
          <button onClick={prevTestimonial} className="p-2 bg-gray-200 rounded-full">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextTestimonial} className="p-2 bg-gray-200 rounded-full">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      {/* Instagram Section */}
      <div className="relative bg-[#f4ebe6] pt-14 px-4 mt-0 h-[300px] w-[900px] mx-auto justify-center bottom-[300px]">
        <h3 className="text-4xl font-serif text-gray-800">Instagram</h3>
        <div className="mt-4 flex justify-center space-x-4">
          {images.map((src, index) => (
            <img key={index} src={src} alt="Instagram post" className="w-28 h-28 object-cover rounded-md " />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection4;
