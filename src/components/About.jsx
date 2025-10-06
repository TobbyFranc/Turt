import { useEffect, useState, useRef } from "react";
import Turtle from "../assets/Turtle.png";

const facts = [
  {
    text: "85% of travelers want to experience local culture, but 60% feel unprepared.",
    image: "https://images.unsplash.com/photo-1584467735875-1c1b1e6d7c4e?auto=format&fit=crop&w=1200&q=80",
    highlight: "85% of travelers",
    source: {
      name: "TravelPulse",
      year: "2023",
      url: "https://www.travelpulse.com/news/travelers-want-local-culture.html",
    },
  },
  {
    text: "Cultural misunderstandings lead to 30% of travel-related conflicts.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    highlight: "30% of travel-related conflicts",
    source: {
      name: "World Tourism Organization",
      year: "2022",
      url: "https://www.unwto.org/cultural-misunderstandings-travel-conflicts",
    },
  },
  {
    text: "Sustainable tourism benefits local communities and preserves cultural heritage.",
    image: "https://images.unsplash.com/photo-1596464716121-3b3b3c3b3b3b?auto=format&fit=crop&w=1200&q=80",
    highlight: "Sustainable tourism",
    source: {
      name: "WTTC",
      year: "2021",
      url: "https://wttc.org/sustainable-tourism-benefits",
    },
  },
  {
    text: "Travelers who research local customs are 50% more likely to have positive interactions.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    highlight: "50% more likely",
    source: {
      name: "Skift Research",
      year: "2020",
      url: "https://research.skift.com/report/cultural-research-travelers",
    },
  },
  {
    text: "Connecting with locals enhances empathy and global understanding.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    highlight: "Connecting with locals",
    source: {
      name: "Lonely Planet",
      year: "2022",
      url: "https://www.lonelyplanet.com/articles/local-connections",
    },
  },
  {
    text: "Travelers who engage with local culture report higher satisfaction and memorable experiences.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    highlight: "higher satisfaction",
    source: {
      name: "National Geographic",
      year: "2021",
      url: "https://www.nationalgeographic.com/travel/article/cultural-engagement-study",
    },
  },
  {
    text: "Cultural intelligence is a key skill for modern travelers in an interconnected world.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    highlight: "Cultural intelligence",
    source: {
      name: "Harvard Business Review",
      year: "2020",
      url: "https://hbr.org/2020/01/cultural-intelligence-for-travelers",
    },
  },
  {
    text: "Understanding cultural norms reduces the risk of offending locals and enhances safety.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    highlight: "Understanding cultural norms",
    source: {
      name: "World Economic Forum",
      year: "2022",
      url: "https://www.weforum.org/understanding-cultural-norms",
    },
  },
  {
    text: "Immersive cultural experiences lead to personal growth and broadened perspectives.",
    image: "https://images.unsplash.com/photo-1518684079-8a1f1f1f1f1f?auto=format&fit=crop&w=1200&q=80",
    highlight: "Immersive cultural experiences",
    source: {
      name: "Psychology Today",
      year: "2021",
      url: "https://www.psychologytoday.com/immersive-cultural-experiences",
    },
  },
  {
    text: "Travel apps with cultural insights are among the fastest-growing segments in the tourism industry.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    highlight: "fastest-growing segments",
    source: {
      name: "Skift Research",
      year: "2023",
      url: "https://research.skift.com/report/travel-apps-cultural-insights",
    },
  },
  {
    text: "Cultural sensitivity training is becoming standard for frequent travelers and business professionals.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    highlight: "Cultural sensitivity training",
    source: {
      name: "Forbes",
      year: "2022",
      url: "https://www.forbes.com/cultural-sensitivity-training",
    },
  },
  {
    text: "Travelers who respect local customs contribute to positive cross-cultural exchanges.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    highlight: "respect local customs",
    source: {
      name: "UNWTO",
      year: "2021",
      url: "https://www.unwto.org/respecting-local-customs",
    },
  },
  {
    text: "Cultural immersion can lead to lifelong friendships and deeper global connections.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=80",
    highlight: "Cultural immersion",
    source: {
      name: "BBC Travel",
      year: "2020",
      url: "https://www.bbc.com/travel/cultural-immersion-friendships",
    },
  },
  {
    text: "Travelers increasingly seek authentic experiences over traditional tourist activities.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    highlight: "authentic experiences",
    source: {
      name: "Skift",
      year: "2023",
      url: "https://skift.com/authentic-travel-experiences",
    },
  },
  {
    text: "Learning basic phrases in the local language enhances cultural respect and communication.",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    highlight: "local language",
    source: {
      name: "Lonely Planet",
      year: "2022",
      url: "https://www.lonelyplanet.com/articles/learn-local-language",
    },
  },
  {
    text: "Cultural festivals and events offer unique insights into local traditions and values.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    highlight: "Cultural festivals",
    source: {
      name: "National Geographic",
      year: "2021",
      url: "https://www.nationalgeographic.com/cultural-festivals",
    },
  },
  {
    text: "Respecting cultural differences fosters mutual understanding and enriches travel experiences.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    highlight: "Respecting cultural differences",
    source: {
      name: "HuffPost",
      year: "2020",
      url: "https://www.huffpost.com/respecting-cultural-differences",
    },
  },
  {
    text: "Cultural tourism is one of the fastest-growing segments in the global travel industry.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    highlight: "Cultural tourism",
    source: {
      name: "UNWTO",
      year: "2022",
      url: "https://www.unwto.org/cultural-tourism-growth",
    },
  },
  {
    text: "Engaging with local artisans and businesses supports sustainable economic development.",
    image: "https://images.unsplash.com/photo-1518684079-8a1f1f1f1f1f?auto=format&fit=crop&w=1200&q=80",
    highlight: "local artisans and businesses",
    source: {
      name: "World Bank",
      year: "2021",
      url: "https://www.worldbank.org/supporting-local-businesses",
    },
  },
  {
    text: "Travelers who prioritize cultural experiences report higher overall satisfaction.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    highlight: "higher overall satisfaction",
    source: {
      name: "Travel + Leisure",
      year: "2023",
      url: "https://www.travelandleisure.com/cultural-travel-satisfaction",
    },
  },
  {
    text: "Cultural awareness reduces the risk of misunderstandings and enhances safety.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    highlight: "Cultural awareness",
    source: {
      name: "CDC Travel Health",
      year: "2022",
      url: "https://www.cdc.gov/travel/cultural-awareness",
    },
  },
  {
    text: "Immersive cultural experiences lead to personal growth and broadened perspectives.",
    image: "https://images.unsplash.com/photo-1518684079-8a1f1f1f1f1f?auto=format&fit=crop&w=1200&q=80",
    highlight: "Immersive cultural experiences",
    source: {
      name: "Psychology Today",
      year: "2021",
      url: "https://www.psychologytoday.com/immersive-cultural-experiences",
    },  
  },
  {
    text: "Travel apps with cultural insights are among the fastest-growing segments in the tourism industry.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    highlight: "fastest-growing segments",
    source: {
      name: "Skift Research",
      year: "2023",
      url: "https://research.skift.com/report/travel-apps-cultural-insights",
    },
  },
  {
    text: "Cultural sensitivity training is becoming standard for frequent travelers and business professionals.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    highlight: "Cultural sensitivity training",
    source: {
      name: "Forbes",
      year: "2022",
      url: "https://www.forbes.com/cultural-sensitivity-training",
    },
  },


];

const About = () => {
  const [currentFact, setCurrentFact] = useState(0);
  const [fade, setFade] = useState(true);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentFact((prev) => (prev + 1) % facts.length);
        setFade(true);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSwipe = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (Math.abs(distance) > 50) {
        setFade(false);
        setTimeout(() => {
          if (distance > 0) {
            setCurrentFact((prev) => (prev + 1) % facts.length);
          } else {
            setCurrentFact((prev) => (prev - 1 + facts.length) % facts.length);
          }
          setFade(true);
        }, 300);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section id="About" className="relative w-full bg-[var(--backgroundColor)] py-16 px-4">
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
      <div className="text-center space-y-4 mb-12 cormorant-garamond-400 text-[var(--textColor)]">
        <h3 className="text-4xl md:text-5xl font-bold capitalize">
          Connect with Cultural Reality
        </h3>
        <p className="max-w-2xl mx-auto text-lg">
          We bridge the gap between travelers and local cultures, fostering understanding and respect.
        </p>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto">
        <hr className="my-8 border-[var(--lightGraycolor)] text-[var(--grayColor)]" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Static Heading */}
        <div className="flex items-center space-x-3 open-sans-400 mb-4 rounded-md bg-[var(--whiteColor)] px-4 py-2 shadow-md">
          <img src={Turtle} alt="Turtle Icon" className="w-10 h-10" />
          <h3 className="text-3xl font-bold text-slate-600">Did You Know?</h3>
        </div>

        {/* Swipeable Fact Card */}
        <div
          className="bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col md:flex-row items-center transition-all duration-700 ease-in-out min-h-[450px] overflow-hidden relative max-w-5xl w-full cursor-grab touch-pan-y"
          onTouchStart={(e) => (touchStartX.current = e.changedTouches[0].clientX)}
          onTouchEnd={(e) => {
            touchEndX.current = e.changedTouches[0].clientX;
            handleSwipe();
          }}
        >
          {/* Image Segment */}
          <div className="w-full md:w-1/2 h-[450px] relative">
            <img
              src={facts[currentFact].image}
              onError={(e) => (e.currentTarget.src = Turtle)}
              alt="Fact Visual"
              className="w-full h-full object-cover brightness-95 rounded-tr-xl md:rounded-l-xl"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Text Segment */}
          <div
            className={`w-full md:w-1/2 p-8 transition-opacity duration-700 ease-in-out ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-xl text-[var(--grayColor)] leading-relaxed open-sans-400 mb-6">
              {facts[currentFact].text.split(facts[currentFact].highlight).map((part, i) => (
                <span key={i}>
                  {part}
                  {i < facts[currentFact].text.split(facts[currentFact].highlight).length - 1 && (
                    <span className="text-[var(--primaryColor)] font-bold text-2xl cormorant-garamond-400">
                      {facts[currentFact].highlight}
                    </span>
                  )}
                </span>
              ))}
            </p>

            {/* Source Link */}
            {facts[currentFact].source && (
              <div className="absolute bottom-4 right-6 text-sm text-gray-500">
                <a
                  href={facts[currentFact].source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {facts[currentFact].source.name}, {facts[currentFact].source.year}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Fallback Navigation */}
        <div className="hidden md:flex justify-between mt-4 w-full max-w-5xl">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setCurrentFact((prev) => (prev - 1 + facts.length) % facts.length)}
          >
            ← Prev
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setCurrentFact((prev) => (prev + 1) % facts.length)}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
