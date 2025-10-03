import WorldMap from "../assets/worldmap6.jpg";
import worldpalm from "../assets/WorldPalm.jpg";
import globe from "../assets/Globe.png";
import Search from "./Search";

const Map = () => {
  return (
    <section id="Explore" className="w-full pt-12 space-y-6">
      
      {/* Header Section */}
      <header className="z-10 w-full text-center cormorant-garamond-400 space-y-4 mb-12 px-4">
        <h3 className="text-2xl md:text-4xl lg:text-4xl xl:text-6xl font-bold text-slate-500 capitalize">
          Exploring the Cultural Space with Ease
        </h3>
        <p className="max-w-2xl mx-auto text-base text-gray-600">
          Discover cultures, connect with communities, and unlock authentic experiences.
        </p>
      </header>
      {/* Divider */}
      <div className="max-w-6xl mx-auto">
        <hr className="my-8 border-gray-300" />
      </div>

      {/* Map Background Section */}
      <div
        className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row md:flex-wrap gap-4 justify-between rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${WorldMap})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "500px",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white opacity-90 pointer-events-none"></div>

        {/* Search Cards */}
        <div className="relative z-10 w-full p-4">
          <Search />
        </div>
      </div>

      {/* Attribution */}
      {/* <footer className="text-center text-gray-500 font-cormorant text-lg px-4">
        <p className="text-sm">
          Powered by <span className="font-bold text-[var(--primaryColor)]">OpenAI</span> and{" "}
          <span className="font-bold text-[var(--primaryColor)]">Google Maps</span>
        </p>
      </footer> */}

      {/* Bottom Divider */}
      <div className="max-w-6xl mx-auto">
        <hr className="my-8 border-gray-300" />
      </div>
      
    </section>
  );
};

export default Map;