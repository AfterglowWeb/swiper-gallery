import { createRoot } from '@wordpress/element';
import ThemePalette from './front/ThemePalette';

function initializeReactComponents() {
  const swiperGalleries = document.querySelectorAll('.swiper-gallery-block');
  
  swiperGalleries.forEach(swiperGallery => {

    if (swiperGalleryData) {
      try {
        const root = createRoot(swiperGallery);
        root.render(
          <ThemePalette>
          </ThemePalette>
        )
      } catch (error) {
        console.error('Error initializing Swiper Gallery React component:', error);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', initializeReactComponents);