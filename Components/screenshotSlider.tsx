import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useRouter } from 'next/router';

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const ScreenshotSlider = ({ imageUrls }) => {

    const router = useRouter()

    const goBack = () => {
        router.back(); // This will navigate back to the previous page
    };

    return (
        <div>
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            style={{ height: '100vh' }} // Set Swiper container height to viewport height
        >
            {imageUrls.map((url, index) => (
                <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={url} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%' }} />
                </SwiperSlide>
            ))}
        </Swiper>

        <div> <button onClick={goBack}>Go Back</button> </div>

        </div>
        
    );
};

export default ScreenshotSlider;