import React from 'react';

const testimonialImages = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/45.jpg',
  'https://randomuser.me/api/portraits/men/76.jpg',
  'https://randomuser.me/api/portraits/women/22.jpg',
];

function TrustedTestimonials() {
  return (
    <div className=" text-center flex justify-center items-center">

      <div className="flex justify-center flex-wrap px-4">
        {testimonialImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`User ${index + 1}`}
            className="w-8 h-/ rounded-full hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>
        <p className="text-gray-400 text-sm">
            Trusted by over 10k+ users </p>

      
    </div>
  );
}

export default TrustedTestimonials;
