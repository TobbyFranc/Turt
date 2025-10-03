// filepath: /Users/macbook/Desktop/Turtura/src/components/HeroSlider.jsx
import Slider from "react-slick";
import heroImg from '../assets/adowa.jpg-1080x675.webp';
import culturehorn from "../assets/culturehorn.jpg";
import indigenousPeople from "../assets/indigenous-people.jpg";
import Rajas from "../assets/Rajasthani.png";
import Thai from "../assets/Thai.jpg";
import Obatala from "../assets/Obatala_Priest.webp";

// Import slick-carousel css files
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Array of images for the slider

const images = [heroImg, culturehorn, indigenousPeople, Rajas, Thai, Obatala];

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed:10000,
    slidesToShow: 1,
    slidesToScroll: -1,
    autoplay: true,
    autoplaySpeed: 50000,
    arrows: false,
  };

  return (
    <Slider {...settings} className="w-full h-full">
      {images.map((img, idx) => (
        <div key={idx} className="w-full h-[80vh]">
          <img
            src={img}
            alt={`slide-${idx}`}
            className="w-full h-full object-cover rounded-md shadow-lg"
          />
        </div>
      ))}
    </Slider>
  );
};

export default HeroSlider;