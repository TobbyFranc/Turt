import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { FiMail } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Turtle from '../assets/Turtle.png';
import orisa from '../assets/Orisa.jpg'
// import orisa from '../assets/Orisa.jpg';
import Tobi from '../assets/Tobii.jpeg'

const teamMembers = [
  {
    name: 'Tobi Francis Ogunleye',
    role: 'Founder & CEO',
    image: Tobi,
    bio: 'Tobi is a seasoned traveler and cultural enthusiast with over a decade of experience in the travel industry. She founded Turtura to help others navigate the complexities of global cultures.',
    email: 'mailto:tobbyfranc@gmail.com',
    linkedin: 'https://www.linkedin.com/in/tobi-frank-4-greencraft',
  },
  {
    name: 'Orisabinone Covenant',
    role: 'Community & Research Lead',
    image: orisa,
    bio: "Orisabinone is passionate about cultural research and community building. He ensures that Turtura’s content is accurate, respectful, and engaging for users worldwide.",
    email: 'mailto:orisacovenant@yahoo.com',
    linkedin: 'https://www.linkedin.com/in/covenant-orisabinone-321559203?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  },
  {
    name: 'Tobi Francis Ogunleye',
    role: 'Chief Technology Officer',
    image: Turtle,
    bio: 'Tobby is a tech visionary with a passion for building innovative solutions. He leads the development of Turtura’s platform, ensuring it meets the needs of modern travelers.',
    email: 'mailto:tobby@turtura.com',
    linkedin: 'https://linkedin.com/in/tobby',
  },
    {
    name: 'Orisabinone Covenant',
    role: 'Community & Research Lead',
    image: Turtle,
    bio: "Orisabinone is passionate about cultural research and community building. He ensures that Turtura’s content is accurate, respectful, and engaging for users worldwide.",
    email: 'mailto:alex@turtura.com',
    linkedin: 'https://linkedin.com/in/alexrivers',
  },
];

const TeamSlider = () => {
  return (
    <section id="Teams" className="relative w-full bg-[var(--backgroundColor,#f9fafb)] py-12">
            {/* Background Vectors */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 800 400">
          <circle cx="100" cy="100" r="80" stroke="var(--primaryColor,#3b82f6)" strokeWidth="2" />
          <circle cx="700" cy="300" r="80" stroke="var(--accentColor,#fbbf24)" strokeWidth="2" />
          <circle cx="400" cy="200" r="80" stroke="var(--primaryColor,#3b82f6)" strokeWidth="2" />
          <circle cx="200" cy="300" r="80" stroke="var(--accentColor,#fbbf24)" strokeWidth="2" />
          <circle cx="600" cy="100" r="80" stroke="var(--primaryColor,#3b82f6)" strokeWidth="2" />
        </svg>
      </div>
      {/* Header */}
      <div className="text-center space-y-4 mb-12 px-4 cormorant-garamond-400">
        <h3 className="text-4xl md:text-5xl font-bold text-slate-500 capitalize">Meet the Team</h3>
        <p className="max-w-2xl mx-auto text-gray-700">
          Our diverse team is passionate about travel, culture, and technology. We’re building Turtura to help travelers move through the world with dignity, curiosity, and cultural intelligence.
        </p>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto">
        <hr className="my-8 border-gray-300" />
      </div>

      {/* Slider */}
      <div className="group max-w-[90%] mx-auto px-4 relative pb-24">
        {/* Swiper */}
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          navigation={false}
          className="!pb-16"
        >
          {teamMembers.map((member, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white shadow-lg rounded-lg p-6 text-gray-800 flex flex-col items-center justify-between min-h-[460px] pb-6 hover:shadow-xl transition-shadow duration-300">
                <img src={member.image} alt={member.name} onError={(e) => (e.currentTarget.src = Turtle)} className="w-32 h-32 rounded-full mb-4 transition duration-300 ease-in-out shadow-md" />
                <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
                <p className="text-gray-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-center mb-4 flex-grow">{member.bio}</p>
                <div className="flex space-x-4 mt-auto">
                  <a href={member.email} className="text-blue-500 hover:text-blue-700 text-xl">
                    <FiMail />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-xl">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TeamSlider;
