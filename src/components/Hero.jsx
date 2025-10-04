import HeroSlider from "./HeroSlider";
import { useNavigate } from "react-router-dom";


const Hero = () => {
  const navigate = useNavigate();

  const handleScroll = () => {
  const section = document.getElementById("Explore");
  section?.scrollIntoView({ behavior: "smooth" });
};


  return (
    <section id="Home" className="w-full max-h-[700px] relative flex justify-center mt-14 overflow-hidden bg-[var(--backgroundColor)] open-sans-400">
      <div className="relative w-full flex flex-col lg:flex-row justify-center items-center pt-4 lg:pt-0">
        {/* Text Content */}
        <div className="z-10 text-center px-8 md:px-4 lg:px-2 flex flex-col justify-center items-center space-y-8 lg:items-start lg:text-start lg:ml-4">
          {/* Color Bars */}
          <div className="w-[200px] mb-4 flex justify-between items-center">
            <div className="w-1/3 h-1 md:h-2 bg-red-600" />
            <div className="w-1/3 h-1 md:h-2 bg-blue-600 ml-4" />
            <div className="w-1/3 h-1 md:h-2 bg-[var(--accentColor)] ml-4" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl xl:text-5xl inter-500 font-bold text-[var(--grayColor)] mb-4">
            Explore Boldly.
            <span className="text-[var(--whiteColor)] lg:text-[var(--textColor)] "> Connect Deeply.</span> 
            Travel with Cultural Intelligence.
          </h1>

          {/* Subtext */}
          <p className="text-[var(--whiteColor)] lg:text-[var(--textColor)] max-w-2xl">
            Turtura is your pocket guide to respectful exploration. From real-time cultural alerts to immersive local insights, we help you navigate unfamiliar places with confidence, curiosity, and connection—so you feel at home wherever you go.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 pt-4 pb-8">
            <button onClick={() => navigate("/Login")} className="flex items-center justify-center w-[280px] lg:w-auto px-4 py-2 rounded-md bg-[var(--accentColor)] text-[var(--whiteColor)] hover:bg-[var(--primaryColor)] transition duration-300">
              Get Started
                {/* span icon for get started */}
                <span className="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </span>

            </button>
            <button onClick={handleScroll} className="flex items-center justify-center w-[280px] lg:w-auto px-4 py-2 rounded-md bg-[var(--lightGrayColor)] lg:bg-[var(--whiteColor)] text-[var(--primaryColor)] hover:bg-[var(--primaryColor)] hover:text-[var(--backgroundColor)] transition duration-300">
              Start Exploring
              {/* span icon for explore */}
              <span className="ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Hero Image / Slider */}
        <div className="absolute lg:relative xl:clap w-full h-full lg:w-1/2 bg-cover bg-center filter saturate-0 brightness-[0.14] lg:saturate-50 lg:brightness-50">
          <HeroSlider />
        </div>
      </div>
    </section>
  );
};

export default Hero;
