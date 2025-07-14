import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const images = [
  '/mine/img1.jpg',
  '/mine/img2.jpg',
  '/mine/img3.jpg',
  '/mine/img5.jpg',
  '/mine/img7.jpg',
  '/mine/img8.jpg',
  '/mine/img9.jpg',
  '/mine/img10.jpg',
  '/mine/img11.jpg',
  '/mine/img12.jpg',
  '/mine/img13.jpg',
  '/mine/img14.jpg',
  '/mine/img15.jpg',
  '/mine/img16.jpg',
  '/mine/img17.jpg',
  '/mine/img18.jpg',
  '/mine/img19.jpg',
  '/mine/img20.jpg',
  '/mine/img21.jpg',
];

const GallerySection = () => {
  const swiperRef = useRef(null);

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-transparent">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold">
            <span className="text-glow bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            A glimpse into my journey, moments, and memories
          </p>
        </div>
        {/* 3D Coverflow Carousel */}
        <Swiper
          ref={swiperRef}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={window.innerWidth < 768 ? 1.2 : 3}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 60,
            stretch: 0,
            depth: 300,
            modifier: 2.5,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="w-full max-w-screen-2xl mx-auto"
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative group">
                <div className="glassy-card rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur-2xl transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_0_40px_8px_rgba(80,180,255,0.25)]">
                  <img
                    src={src}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-[24rem] md:h-[32rem] object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Glow overlay */}
                  <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ boxShadow: '0 0 80px 10px #00e0ff55, 0 0 0 2px #fff2' }}></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default GallerySection; 