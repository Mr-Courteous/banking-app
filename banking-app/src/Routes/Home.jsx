import React from "react";
import Carousel from '../Components/ImageCarousel'



import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import Header from "../Components/Header";



function Home() {
    return (
        <div>

            <Header />
       



            <Carousel />












        </div>
    )
}


export default Home