import { useState } from '@wordpress/element';
import { Swiper, SwiperSlide } from 'swiper/react';
import GalleryNavigation from './GalleryNavigation';
import DialogGallery from './DialogGallery';
import Container from '@mui/material/Container';

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
    EffectCube 
} from 'swiper/modules';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-cube';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function FrontGallery({
    gallery = [],
    options = {},
    clientId,
    align
}) {
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState(null);

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
        galleryHeightDesktop = 400,
        galleryHeightTablet = 400,
        galleryHeightMobile = 300,
        showFigcaption = false,
        figcaptionPosition = 'bottom',
        startIndex = 0,
        openModal = false,
    } = options || {};


    const handleSwiperInit = (swiper) => {
        setSwiperInstance(swiper);
        
        if (startIndex && typeof startIndex === 'number' && startIndex < gallery.length) {
            setTimeout(() => {
                swiper.slideTo(startIndex);
            }, 100);
        }
    };

    const handleImageClick = (e) => {
        if (!openModal) return;
        
        if (swiperInstance) {
            setGalleryIndex(swiperInstance.activeIndex);
        }
        setGalleryOpen(true);
    };
    
    const handleCloseGallery = () => {
        setGalleryOpen(false);
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    
    const currentHeight = isMobile 
        ? galleryHeightMobile 
        : isTablet 
            ? galleryHeightTablet 
            : galleryHeightDesktop;
    
    const figcaptionPositionClass = figcaptionPosition === 'top' ? 'top-0' : 'bottom-0';

    const maxWidth = () => {
        if (align === 'full') {
            return false;
        } else if (align === 'wide') {
            return 'xl';
        } else {
            return 'lg';
        }
    }

    return (
        <>
            <Container 
            sx={{
                position: 'relative',
                height: currentHeight,
                overflow: 'hidden'
            }}
            maxWidth={maxWidth()}
            >
                <Swiper 
                    modules={[
                        Autoplay, Scrollbar, Pagination, Navigation, Mousewheel, 
                        EffectFade, EffectCards, EffectFlip, EffectCoverflow, 
                        EffectCreative, EffectCube
                    ]}
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
                    onSwiper={handleSwiperInit}
                >
                    {gallery.map((image, index) => (
                        <SwiperSlide key={`gallery-${image.mediaId || index}`}>
                            <img
                                src={image.mediaUrl}
                                alt={image.mediaAlt || ''}
                                onClick={handleImageClick}
                                style={{
                                    width: '100%', 
                                    height: currentHeight, 
                                    objectFit: 'cover',
                                    cursor: openModal ? 'pointer' : 'default'
                                }}
                            />
                            {showFigcaption && image.mediaAlt && (
                                <figcaption className={figcaptionPositionClass}>
                                    {image.mediaAlt}
                                </figcaption>
                            )}
                        </SwiperSlide>
                    ))}

                    {!hideScrollBar && <div className="swiper-scrollbar"></div>}
                    {!hideNavigation && <GalleryNavigation />}
                    {!hidePagination && <div className="swiper-pagination"></div>}
                </Swiper>
            </Container>
            
            {openModal && (
                <Dialog
                open={galleryOpen}
                onClose={handleCloseGallery}
                keepMounted={true}
                fullScreen={true}
            >
                <DialogTitle>
                    <Fab sx={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        height: "36px",
                        width: "36px", 
                        boxShadow: "unset",
                    }}
                    size="small" color="primary" onClick={handleCloseGallery}>
                        <CloseIcon/>
                    </Fab>
                </DialogTitle>
                <DialogContent>
                    <DialogGallery 
                        attributes={{gallery:gallery, options:options }}
                        galleryIndex={galleryIndex} 
                        figcaptionPositionClass={figcaptionPositionClass}
                        isOpen={galleryOpen}
                    />
                </DialogContent> 
            </Dialog>
            )}
        </>
    );
};