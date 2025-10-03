import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Turtle from '../assets/turtle.png';
// import './swiper-custom.css'; // optional for styling

const testimonials = [
  {
    quote: `"Turtura transformed my travel experience! The real-time cultural alerts helped me avoid awkward situations and truly connect with the locals. Highly recommend!"`,
    name: 'Jane Doe',
    role: 'Frequent Traveler',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    quote: `"As a first-time traveler, Turtura was a lifesaver! The local insights made me feel more confident and respectful of the culture. I felt like I had a local guide with me at all times."`,
    name: 'John Smith',
    role: 'New Traveler',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    quote: `"I love that Turtura supports sustainable tourism! Knowing that my travels are benefiting local communities makes my experiences even more meaningful."`,
    name: 'Emily Johnson',
    role: 'Eco-conscious Traveler',
    image: 'https://randomuser.me/api/portraits/women/48.jpg',
  },
];

const TestimonialSlider = () => {
  return (
    <div className="w-full py-12">
             <div className=" text-center cormorant-garamond-400  space-y-4 mb-12 px-4">
          <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-500 capitalize">What Our Users Say</h3>
          {/* <p className=''>We bridge the gap between travelers and local cultures, fostering understanding and respect. </p> */}
          <p className='max-w-2xl mx-auto'>Hear from our satisfied users who have experienced the benefits of Turtura in their travels.</p>
        </div>
              {/* divider hr */}
        <div className="max-w-6xl mx-auto">
          <hr className="my-8 border-gray-300"/>
        </div>
      {/*  */}

      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          className="!pb-20" // ensures space for pagination
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white shadow-lg rounded-lg p-6 text-gray-800 h-full flex flex-col justify-between min-h-[320px]">
                <p className="text-gray-600 mb-4 flex-grow">{t.quote}</p>
                <div className="flex items-center mt-auto">
                  <img onError={(e) => (e.currentTarget.src = Turtle)} src={t.image} alt={t.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="font-semibold text-[var(--primaryColor,#3b82f6)]">{t.name}</p>
                    <p className="text-gray-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
                {/* Arrows + Pagination aligned at bottom */}
        <div className="absolute bottom-0 -left-0 -right-0 flex justify-between items-center px-4 z-10 pointer-events-none">
          {/* Left Arrow */}
          <div className="swiper-button-prev hidden md:group-hover:flex pointer-events-auto text-blue-500 hover:text-blue-700 text-2xl font-bold" />
          {/* Pagination Dots */}
          <div className="swiper-pagination flex-grow text-center" />
          {/* Right Arrow */}
          <div className="swiper-button-next hidden md:group-hover:flex pointer-events-auto text-blue-500 hover:text-blue-700 text-2xl font-bold" />
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
