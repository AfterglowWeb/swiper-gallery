import { __ } from '@wordpress/i18n';
import { useEffect, useReducer } from '@wordpress/element';
import { Swiper, SwiperSlide } from 'swiper/react';
import GalleryNavigation from '../front/GalleryNavigation';
import DialogGallery from '../front/DialogGallery';

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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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

import { swiperReducer, initialSwiperState, SWIPER_ACTIONS, SwiperContext } from '../front/swiperReducer';

export default function EditorGallery(props) {
  const { attributes, clientId } = props;
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
      galleryHeightDesktop = 400,
      galleryHeightTablet = 400,
      galleryHeightMobile = 400,
      showFigcaption = false,
      figcaptionPosition = 'bottom',
      startIndex = 0,
      openModal = false,
  } = options || {};
    
  const [state, dispatch] = useReducer(swiperReducer, {
    ...initialSwiperState,
    options: options || {}
  });

    const { instance, images, galleryOpen, galleryIndex, needsUpdate } = state;
 
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    
    const currentHeight = isMobile 
        ? galleryHeightMobile 
        : isTablet 
            ? galleryHeightTablet 
            : galleryHeightDesktop;
            
    const isEditor = typeof wp !== 'undefined' && wp.blockEditor;
    const figcaptionPositionClass = figcaptionPosition === 'top' ? 'top-0' : 'bottom-0';
    
    useEffect(() => {
        if (gallery && Array.isArray(gallery)) {
            dispatch({ type: SWIPER_ACTIONS.SET_IMAGES, payload: gallery });
        }
    }, [gallery]);
    
    useEffect(() => {
      if (!options) return;
      
      dispatch({ 
          type: SWIPER_ACTIONS.UPDATE_OPTIONS, 
          payload: options
      });
      
  }, [
      slidesPerView, spaceBetween, effect, autoplay, loop,
      delay, speed, hideScrollBar, hideNavigation, hidePagination,
      showFigcaption, figcaptionPosition, currentHeight, openModal
  ]);
  
  const swiperKey = `swiper-${clientId}-${needsUpdate ? Date.now() : '0'}`;
  
    const handleSwiperInit = (swiper) => {
        dispatch({ type: SWIPER_ACTIONS.INIT_SWIPER, payload: swiper });
        
        if (startIndex && typeof startIndex === 'number') {
            setTimeout(() => {
                swiper.slideTo(startIndex);
            }, 100);
        }
    };
    
    const handleImageClick = (e) => {
        if (isEditor) {
            e.stopPropagation();
            return;
        }
        
        if (openModal) {
            handleOpenGallery();
        }
    };
    
    const handleOpenGallery = () => {
        if (instance) {
            dispatch({ 
                type: SWIPER_ACTIONS.SET_GALLERY_INDEX, 
                payload: instance.activeIndex 
            });
        }
        dispatch({ type: SWIPER_ACTIONS.TOGGLE_GALLERY, payload: true });
    };
    
    const handleCloseGallery = () => {
        dispatch({ type: SWIPER_ACTIONS.TOGGLE_GALLERY, payload: false });
    };
    
    return (
        <SwiperContext.Provider value={{ state, dispatch }}>
            <Box sx={{
                height: currentHeight,
                width: '100%',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Swiper 
                key={swiperKey}
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
                    onSwiper={handleSwiperInit}
                    preventClicksPropagation={isEditor}
                    simulateTouch={!isEditor}
                    allowTouchMove={!isEditor}
                    preventClicks={isEditor}
                >
                    {images && images.map((image) => (
                        <SwiperSlide key={`gallery-${image.mediaId || Math.random()}`} style={{position: 'relative', height: '100%'}}>
                            <img
                                src={image.mediaUrl}
                                alt={image.mediaAlt || ''}
                                style={{ 
                                    height: currentHeight, 
                                    width: '100%', 
                                    objectFit: 'cover',
                                    pointerEvents: isEditor ? 'none' : 'auto',
                                    cursor: isEditor ? 'default' : (openModal ? 'pointer' : 'default'),
                                }}
                                onClick={handleImageClick}
                            />
                            {(showFigcaption && image.mediaAlt) && (
                                <figcaption className={`absolute left-0 w-full p-2 text-white bg-black/50 text-sm z-10 ${figcaptionPositionClass}`}>
                                    {image.mediaAlt || ''}
                                </figcaption>
                            )}
                        </SwiperSlide>
                    ))}
                    
                    {!hideScrollBar && <div className="swiper-scrollbar"></div>}
                    {!hideNavigation && <GalleryNavigation />}
                    {!hidePagination && <div className="swiper-pagination"></div>}
                </Swiper>
                
                {!isEditor && openModal && 
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
                                attributes={attributes} 
                                galleryIndex={galleryIndex} 
                                figcaptionPositionClass={figcaptionPositionClass}
                                isOpen={galleryOpen}
                            />
                        </DialogContent> 
                    </Dialog>
                }
            </Box>
        </SwiperContext.Provider>
    );
}