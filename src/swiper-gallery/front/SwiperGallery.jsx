import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { Swiper, SwiperSlide } from 'swiper/react';
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
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

export default function SwiperGallery(props) {
    const {attributes} = props;
    const {gallery, options} = attributes;
    const {
        slideTo, 
        slideIndex, 
        slidesPerView = 1,
        spaceBetween = 0,
        effect = '',
        autoplay = true,
        loop = false,
        delay = 3000,
        speed = 1000,
        hideScrollBar = false,
        hideNavigation = false,
        hidePagination = false,
        openModal = true,
        galleryHeightDesktop = '400px',
        galleryHeightTablet = '400px',
        galleryHeightMobile = '400px',
    } = options;
    const [swiperInstance, setSwiperInstance]  = useState();
    const [images, setImages] = useState([]);
    const [openGallery, setOpenGallery] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);

    const handleOpenGallery = (e) => {
      setOpenGallery(true);
      if(swiperInstance) {
      setGalleryIndex(swiperInstance.activeIndex);
      }
    };

    const handleCloseGallery = () => {
      setOpenGallery(false);
    };
  
    useEffect(() => {
        if(gallery) {
            setImages(gallery);
        }
    }
    ,[gallery]);
        
    useEffect(() => {
      if(slideTo && slideIndex && swiperInstance) {
        swiperInstance.slideTo(slideIndex);
      }
    }, [slideTo, slideIndex, swiperInstance]);
  
    return(

      <Box sx={{
        height: {
          xs: galleryHeightMobile,
          sm: galleryHeightTablet,
          md: galleryHeightDesktop,
        },
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}>
      <Swiper 
        modules={[Autoplay, Scrollbar, Pagination, Navigation, Mousewheel, EffectFade, EffectCards, EffectFlip, EffectCoverflow, EffectCreative, EffectCube]}
        autoplay={autoplay ? {
            delay: delay,
            speed: speed,
            disableOnInteraction: false,
        } : false}
        loop={loop}
        scrollbar={!hideScrollBar ? {
            el: '.swiper-scrollbar',
            hide: false,
            draggable: true,
        } : false}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        effect={effect}
        navigation={!hideNavigation ? {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        } : false}
        pagination={!hidePagination ? {
          el: '.swiper-pagination',
          clickable: true,
        } : false}
        onSwiper={setSwiperInstance}
        >
        {images && images.map((image) => {
            return (
            <SwiperSlide key={`gallery-${image.mediaId}`}>
                <img
                  src={image.mediaUrl}
                  alt={image.mediaAlt}
                  style={{ 
                    height: galleryHeightDesktop, 
                    width: '100%', 
                    objectFit: 'cover' 
                  }}
                  className={`${openModal && 'cursor-pointer'}`}
                  onClick={(e) => {openModal && handleOpenGallery(e)}}
                />
            </SwiperSlide>
            )
        })}

        {!hideScrollBar && <div className="swiper-scrollbar"></div>}
        {!hideNavigation && <GalleryNavigation />}
        {!hidePagination && <div className="swiper-pagination"></div>}
      </Swiper>

      {!openModal && 
      <Dialog
      open={openGallery}
      onClose={handleCloseGallery}
      keepMounted={true}
      fullScreen={true}
      >
        <DialogTitle>
          <Fab sx={{
            position:"absolute",
            top:"8px",
            right:"8px",
            height:"36px",
            width:"36px", 
            boxShadow:"unset",
            }}
            size="small" color="primary" onClick={handleCloseGallery}>
            <CloseIcon/>
          </Fab>
        </DialogTitle>
        <DialogContent>
          <DialogGallery images={images} openGallery={openGallery} slideIndex={galleryIndex} />
        </DialogContent> 
      </Dialog>
      }
      </Box>
    )
  }

  function GalleryNavigation() {

    const buttonStyle = {
      width: '36px',
      height: '36px',
    };
  
    const prevArrowStyle = {
        width: '20px',
        height: '20px',
        transform: "translateX(3px)"
    };
  
    const nextArrowStyle = {
        width: '20px',
        height: '20px',
    };
  
    return(
      <>
       <div className="swiper-button-prev absolute top-1/2 left-6 z-10" style={buttonStyle}>
            <Fab sx={buttonStyle} size="small" color="primary">
                <ArrowBackIosIcon sx={{ fontSize: 20 }} style={prevArrowStyle} />
            </Fab> 
        </div>
        <div className="swiper-button-next absolute top-1/2 right-6 z-10" style={buttonStyle}>
            <Fab sx={buttonStyle} size="small" color="primary">
                <ArrowForwardIosIcon sx={{ fontSize: 'inherit' }} style={nextArrowStyle} />
            </Fab>
        </div>
      </>
    )
  }

function DialogGallery({images, openGallery, slideIndex}) {
  
    const [swiperInstance, setSwiperInstance]  = useState();
  
    useEffect(() => {
      if(openGallery && swiperInstance) {
        swiperInstance.slideTo(slideIndex);
      }
    },[openGallery, swiperInstance, slideIndex]);
  
    return(
      <Swiper 
      modules={[Autoplay, Scrollbar, Pagination, Navigation, Mousewheel, EffectFade]}
      slidesPerView={1}
      spaceBetween={20}
      effect="fade"
      fadeEffect={{crossFade: true }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      mousewheel={{
          enabled:true,
      }}
      style={{height:"100%"}}
      onInit={(swiper) => {
        setSwiperInstance(swiper);
      }}
      >
      {images.map((image) => {
  
          return (
          <SwiperSlide key={`gallery-${image.mediaUrl}`} style={{height: 100 + '%'}}>
              <img
                  src={image.mediaUrl}
                  alt={image.mediaAlt}
                  style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                />
          </SwiperSlide>
          )
      })}
      <GalleryNavigation />
    </Swiper>
    )
  }