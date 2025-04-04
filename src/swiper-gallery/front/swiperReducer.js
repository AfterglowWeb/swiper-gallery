import { createContext } from '@wordpress/element';

export const SWIPER_ACTIONS = {
  INIT_SWIPER: 'INIT_SWIPER',
  DESTROY_SWIPER: 'DESTROY_SWIPER',
  SET_IMAGES: 'SET_IMAGES',
  SET_GALLERY_INDEX: 'SET_GALLERY_INDEX',
  TOGGLE_GALLERY: 'TOGGLE_GALLERY',
  UPDATE_OPTIONS: 'UPDATE_OPTIONS',
};

export const initialSwiperState = {
  instance: null,
  images: [],
  galleryOpen: false,
  galleryIndex: 0,
  options: {}, // Store current options here for comparison
  needsUpdate: false // Flag to track if options have changed
};

export function swiperReducer(state, action) {
  switch (action.type) {
    case SWIPER_ACTIONS.INIT_SWIPER:
      return {
        ...state,
        instance: action.payload,
        needsUpdate: false // Reset flag after initialization
      };
      
    case SWIPER_ACTIONS.DESTROY_SWIPER:
      if (state.instance) {
        try {
          state.instance.destroy(true, true);
        } catch (e) {
          console.error("Error destroying Swiper instance:", e);
        }
      }
      return {
        ...state,
        instance: null
      };
      
    case SWIPER_ACTIONS.SET_IMAGES:
      return {
        ...state,
        images: action.payload
      };
      
    case SWIPER_ACTIONS.SET_GALLERY_INDEX:
      return {
        ...state,
        galleryIndex: action.payload
      };
      
    case SWIPER_ACTIONS.TOGGLE_GALLERY:
      return {
        ...state,
        galleryOpen: action.payload
      };
      
    case SWIPER_ACTIONS.UPDATE_OPTIONS:
      const newOptions = action.payload;
      
      // Update real-time options if possible without recreating
      if (state.instance && !action.forceRecreate) {
        try {
          // Update what we can directly
          if ('slidesPerView' in newOptions) {
            state.instance.params.slidesPerView = Number(newOptions.slidesPerView);
          }
          
          if ('spaceBetween' in newOptions) {
            state.instance.params.spaceBetween = Number(newOptions.spaceBetween);
          }
          
          if ('speed' in newOptions) {
            state.instance.params.speed = Number(newOptions.speed);
          }
          
          if ('loop' in newOptions) {
            // Loop requires recreation
          }
          
          if ('autoplay' in newOptions || 'delay' in newOptions) {
            if (newOptions.autoplay) {
              state.instance.autoplay.start();
              if ('delay' in newOptions) {
                state.instance.params.autoplay.delay = Number(newOptions.delay);
              }
            } else {
              state.instance.autoplay.stop();
            }
          }
          
          // Apply the parameter changes
          state.instance.update();
        } catch (e) {
          console.error("Error updating Swiper params:", e);
        }
      }
      
      // Check if we need complete recreation (for options like loop, effect)
      const needsRecreation = 
        'loop' in newOptions || 
        'effect' in newOptions || 
        'navigation' in newOptions ||
        'pagination' in newOptions ||
        'scrollbar' in newOptions;
      
      return {
        ...state,
        options: {...state.options, ...newOptions},
        needsUpdate: needsRecreation
      };
      
    default:
      return state;
  }
}

export const SwiperContext = createContext(null);