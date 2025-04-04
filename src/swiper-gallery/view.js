import { createRoot } from '@wordpress/element';
import ThemePalette from './front/ThemePalette';
import FrontGallery from './front/FrontGallery';

document.addEventListener('DOMContentLoaded', () => {
  const galleryBlocks = document.querySelectorAll('.wp-block-cmk-swiper-gallery');
  
  if (!galleryBlocks.length) {
      return;
  }
  
  galleryBlocks.forEach(block => {
      const clientId = block.id || '';
      
      const dataScript = block.querySelector('.block-data');
      if (!dataScript) {
        return;
      }

      
      try {
          const attributes = JSON.parse(dataScript.textContent);

          const reactContainer = document.createElement('div');
          reactContainer.className = 'swiper-gallery-react-root';
          
          block.parentNode.replaceChild(reactContainer, block);
          
          const root = createRoot(reactContainer);
          root.render(
            <ThemePalette>
              <FrontGallery 
              gallery={attributes.gallery || []} 
              options={attributes.options || {}} 
              clientId={clientId}
              align={attributes.align || 'wide'}
              />
            </ThemePalette>
          )
        
      } catch (error) {
          console.error('Failed to initialize Swiper Gallery:', error);
      }
  });
});