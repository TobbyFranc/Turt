import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlider = ({ activeTab, images, fallbackImagesMap, locationData, savedGallery, setSavedGallery }) => {

    if (!locationData) {
  return <div className="text-sm text-[var(--grayColor)]">Loading map...</div>;
}

  const isValidCoordinates =
  locationData &&
  locationData.lat &&
  locationData.lon &&
  locationData.lat !== "Unknown" &&
  locationData.lon !== "Unknown";


  if (activeTab === "Description" && isValidCoordinates) {
    return (
      <iframe
        title="Map"
        src={`https://maps.google.com/maps?q=${locationData.lat},${locationData.lon}&z=6&output=embed`}
        className="w-full h-[400px] rounded-md border-0"
        allowFullScreen
        loading="lazy"
      />
    );
  }

  const tabImages = images[activeTab]?.length > 0 ? images[activeTab] : fallbackImagesMap[activeTab] || [];

  return (
    <Swiper key={activeTab} modules={[Navigation, Pagination]} spaceBetween={10} slidesPerView={1} navigation pagination={{ clickable: true }}>
      {tabImages.map((img, index) => {
        const imageUrl = img?.urls?.regular || img;
        const caption = img?.alt_description || `${activeTab} culture`;
        const credit = img?.user?.name || "Unknown";

        return (
          <SwiperSlide key={index}>
            <div className="w-full h-[400px] rounded-md overflow-hidden relative">
              <img src={imageUrl} alt={caption} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-sm p-2 flex justify-between items-center">
                <span>{caption}</span>
                <span className="italic">📸 {credit}</span>
              </div>
              <button
                onClick={() => setSavedGallery((prev) => [...prev, imageUrl])}
                className="absolute top-2 right-2 bg-white text-[var(--primaryColor)] px-2 py-1 rounded-md text-xs shadow hover:bg-[var(--accentColor)] hover:text-white"
              >
                Save
              </button>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageSlider;
