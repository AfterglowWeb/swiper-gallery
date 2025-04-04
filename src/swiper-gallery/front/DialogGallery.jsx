import { __ } from '@wordpress/i18n';
import { useEffect, useReducer } from '@wordpress/element';
import { Swiper, SwiperSlide } from 'swiper/react';
import GalleryNavigation from './GalleryNavigation';

import { 
    Scrollbar, 
    Pagination, 
    Navigation, 
    Mousewheel, 
    Autoplay, 
    EffectFade, 
    EffectCards, 
    EffectFlip, 
    EffectCoverflow, 
    EffectCreative, 
    EffectCube } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-cube';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';

export default function DialogGallery(props) {
    const { attributes, galleryIndex, figcaptionPositionClass, isOpen } = props;
    const { gallery, options } = attributes;
    
    const { 
        slidesPerView = 1,
        spaceBetween = 0,
        effect = 'slide',
        autoplay = false,
        loop = false,
        delay = 3000,
        speed = 1000,
        hideScrollBar = false,
        hideNavigation = false,
        hidePagination = false,
        showFigcaption = false,
    } = options || {};
    
    
    return(
        <Swiper 
            modules={[Autoplay, Scrollbar, Pagination, Navigation, Mousewheel, EffectFade, EffectCards, EffectFlip, EffectCoverflow, EffectCreative, EffectCube]}
            autoplay={autoplay ? {
                delay: Number(delay),
                speed: Number(speed),
                disableOnInteraction: false,
            } : false}
            loop={Boolean(loop)}
            scrollbar={!hideScrollBar ? {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
            } : false}
            slidesPerView={Number(slidesPerView)}
            spaceBetween={Number(spaceBetween)}
            effect={effect}
            navigation={!hideNavigation ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            } : false}
            pagination={!hidePagination ? {
                el: '.swiper-pagination',
                clickable: true,
            } : false}
        >
            {gallery && gallery.map((image) => (
                <SwiperSlide key={`dialog-${image.mediaId || Math.random()}`} style={{height: '100%'}}>
                    <figure className="relative w-full h-full">
                        <img
                            src={image.mediaUrl}
                            alt={image.mediaAlt || ''}
                            style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                        />
                        {(showFigcaption && image.mediaAlt) && (
                            <figcaption className={`block absolute left-0 w-full p-2 text-white bg-black/50 text-sm z-10 ${figcaptionPositionClass}`}>
                                {image.mediaAlt || ''}
                            </figcaption>
                        )}
                    </figure>
                </SwiperSlide>
            ))}
            <GalleryNavigation />
        </Swiper>
    );
}