import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import MuiInputSlider from './MuiInputSlider';
import MuiSelect from './MuiSelect';
import MuiCheckbox from './MuiCheckbox';
import { __experimentalUnitControl as UnitControl } from '@wordpress/components';

export default function SwiperOptions(props) {
    const { attributes, setAttributes } = props;
    const { options } = attributes;

    // Initialize options structure if empty
    useEffect(() => {
        if (!options || typeof options !== 'object') {
            setAttributes({ 
                options: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    effect: 'slide',
                    autoplay: false,
                    loop: false,
                    delay: 3000,
                    speed: 500,
                    hideScrollBar: false,
                    hideNavigation: false,
                    hidePagination: false,
                    galleryHeightDesktop: 400,
                    galleryHeightTablet: 400,
                    galleryHeightMobile: 400,
                    showFigcaption: false,
                    figcaptionPosition: 'bottom',
                    openModal: false,
                }
            });
        }
    }, [options, setAttributes]);
    
    // Safe destructuring with strict type checking
    const {
        slidesPerView = 1,
        spaceBetween = 0,
        effect = 'slide',
        autoplay = false,
        loop = false,
        delay = 3000,
        speed = 500,
        hideScrollBar = false,
        hideNavigation = false,
        hidePagination = false,
        galleryHeightDesktop = 400,
        galleryHeightTablet = 400,
        galleryHeightMobile = 400,
        showFigcaption = false,
        figcaptionPosition = 'bottom',
        openModal = false,
    } = options || {};

    // Helper function to update options with proper types
    const updateOption = (name, value) => {
        // Convert values to proper types before storing
        let typedValue = value;
        
        // Handle specific types
        if (['slidesPerView', 'spaceBetween', 'delay', 'speed'].includes(name)) {
            typedValue = Number(value);
        }
        else if (['autoplay', 'loop', 'hideScrollBar', 'hideNavigation', 
                  'hidePagination', 'showFigcaption', 'openModal'].includes(name)) {
            typedValue = Boolean(value);
        }
        
        console.log(`Setting ${name} to:`, typedValue, `(${typeof typedValue})`);
        
        setAttributes({
            options: {...options, [name]: typedValue}
        });
    };

    const units = [
        { value: 'px', label: 'px', default: 400 },
        { value: '%', label: '%', default: 15 },
        { value: 'vh', label: 'vh', default: 15 },
    ];

    return (
        <>
        <UnitControl
            label={__('Gallery height (desktop)')}
            value={galleryHeightDesktop} 
            units={units} 
            onChange={(value) => updateOption('galleryHeightDesktop', value)}
        />
        <UnitControl
            label={__('Gallery height (tablet)')}
            value={galleryHeightTablet}
            units={units}
            onChange={(value) => updateOption('galleryHeightTablet', value)}
        />
        <UnitControl
            label={__('Gallery height (mobile)')}
            value={galleryHeightMobile}
            units={units}
            onChange={(value) => updateOption('galleryHeightMobile', value)}
        />
        <div className="py-2"/>

        <MuiInputSlider
            label={__('Slides per view')}
            min={1}
            max={9}
            step={1}
            value={slidesPerView}
            onChange={(value) => updateOption('slidesPerView', value)}
        />
        <MuiInputSlider
            label={__('Space between')}
            min={0}
            max={100}
            step={1}
            value={spaceBetween}
            onChange={(value) => updateOption('spaceBetween', value)}
        />
        <div className="py-2"/>
        <MuiSelect
            label={__('Effect')}
            value={typeof effect === 'string' ? effect : 'slide'}
            options={[
                { label: __('Slide'), value: 'slide' },
                { label: __('Fade'), value: 'fade' },
                { label: __('Cards'), value: 'cards' },
                { label: __('Cube'), value: 'cube' },
                { label: __('Coverflow'), value: 'coverflow' },
                { label: __('Flip'), value: 'flip' },
                { label: __('Creative'), value: 'creative' },
            ]}
            onChange={(value) => updateOption('effect', value)}
        />
        
        <MuiCheckbox
            label={__('Autoplay')}
            checked={Boolean(autoplay)}
            onChange={(value) => updateOption('autoplay', value)}
        />
        
        {autoplay && (
            <>
            <MuiInputSlider
                label={__('Delay')}
                min={0}
                max={10000}
                step={100}
                value={delay}
                onChange={(value) => updateOption('delay', value)}
            />
            <MuiInputSlider
                label={__('Speed')}
                min={0}
                max={10000}
                step={100}
                value={speed}
                onChange={(value) => updateOption('speed', value)}
            />
            </>
        )}

        <div className="py-2"/>

        <MuiCheckbox
            label={__('Loop')}
            checked={Boolean(loop)}
            onChange={(value) => updateOption('loop', value)}
        />

        <MuiCheckbox
            label={__('Show captions')}
            checked={Boolean(showFigcaption)}
            onChange={(value) => updateOption('showFigcaption', value)}
        />

        {showFigcaption && (
            <>
            <div className="py-2"/>
            <MuiSelect
                label={__('Caption position')}
                value={typeof figcaptionPosition === 'string' ? figcaptionPosition : 'bottom'}
                options={[
                    { label: __('Bottom'), value: 'bottom' },
                    { label: __('Top'), value: 'top' }
                ]}
                onChange={(value) => updateOption('figcaptionPosition', value)}
            />
            </>
        )}

        <MuiCheckbox
            label={__('Enlarge images on click')}
            checked={Boolean(openModal)}
            onChange={(value) => updateOption('openModal', value)}
        />

        <MuiCheckbox
            label={__('Hide scroll bar')}
            checked={Boolean(hideScrollBar)}
            onChange={(value) => updateOption('hideScrollBar', value)}
        />
        <MuiCheckbox
            label={__('Hide navigation')}
            checked={Boolean(hideNavigation)}
            onChange={(value) => updateOption('hideNavigation', value)}
        />
        <MuiCheckbox
            label={__('Hide pagination')}
            checked={Boolean(hidePagination)}
            onChange={(value) => updateOption('hidePagination', value)}
        />
        </>
    );
}