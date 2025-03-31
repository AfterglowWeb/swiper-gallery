import { __ } from '@wordpress/i18n';
import { PanelBody, CheckboxControl } from '@wordpress/components';
import MuiInputSlider from './MuiInputSlider';
import MuiSelect from './MuiSelect';
import MuiCheckbox from './MuiCheckbox';
import { __experimentalUnitControl as UnitControl } from '@wordpress/components';

export default function SwiperOptions(props) {
    
    const { attributes, setAttributes } = props;
    const { options } = attributes;
    const {
        slidesPerView = 1,
        spaceBetween = 0,
        effect = 'slide',
        autoplay = true,
        loop = false,
        delay = 3000,
        speed = 500,
        hideScrollBar = false,
        hideNavigation = false,
        hidePagination = false,
        galleryHeightDesktop = '400px',
        galleryHeightTablet = '400px',
        galleryHeightMobile = '400px',
    } = options;

    const units = [
        { value: 'px', label: 'px', default: 400 },
        { value: '%', label: '%', default: 15 },
        { value: 'vh', label: 'vh', default: 15 },
    ];


    return (
        <>
        <UnitControl
            label={__('Gallery height (desktop)')}
            value={ galleryHeightDesktop || 'px' } 
            units={ units } 
            onChange={(value) => setAttributes({
                options: {...options, galleryHeightDesktop: value}
            })}
            />
        <UnitControl
            label={__('Gallery height (tablet)')}
            value={ galleryHeightTablet || 'px' }
            units={ units }
            onChange={(value) => setAttributes({
                options: {...options, galleryHeightTablet: value}
            })}
            />
        <UnitControl
            label={__('Gallery height (mobile)')}
            value={ galleryHeightMobile || 'px' }
            units={ units }
            onChange={(value) => setAttributes({
                options: {...options, galleryHeightMobile: value}
            })}
            />
        <div className="py-2"/>

        <MuiInputSlider
            label={__('Slides per view')}
            min={1}
            max={9}
            step={1}
            value={slidesPerView || 3}
            onChange={(value) => setAttributes({
                options: {...options, slidesPerView: value}
            })}
        />
        <MuiInputSlider
            label={__('Space between')}
            min={0}
            max={100}
            step={1}
            value={spaceBetween || 0}
            onChange={(value) => setAttributes({
                options: {...options, spaceBetween: value}
            })}
        />
        <div className="py-2"/>
        <MuiSelect
            label={__('Effect')}
            value={effect || ''}
            options={[
                { label: __('Slide'), value: 'slide' },
                { label: __('Fade'), value: 'fade' },
                { label: __('Cards'), value: 'cards' },
                { label: __('Cube'), value: 'cube' },
                { label: __('Coverflow'), value: 'coverflow' },
                { label: __('Flip'), value: 'flip' },
                { label: __('Creative'), value: 'creative' },
            ]}
            onChange={(value) => setAttributes({
                options: {...options, effect: value}
            })}
        />
        
        <MuiCheckbox
            label={__('Autoplay')}
            checked={autoplay || false}
            onChange={(value) => setAttributes({
                options: {...options, autoplay: value}
            })}
        />
        
        {options.autoplay &&
            <>
            <MuiInputSlider
                label={__('Delay')}
                min={0}
                max={10000}
                step={100}
                value={delay || 3000}
                onChange={(value) => setAttributes({
                    options: {...options, delay: value}
                })}
            />
            <MuiInputSlider
                label={__('Speed')}
                min={0}
                max={10000}
                step={100}
                value={speed || 300}
                onChange={(value) => setAttributes({
                    options: {...options, speed: value}
                })}
            />
            </>
        }

        <div className="py-2"/>

        <MuiCheckbox
            label={__('Loop')}
            checked={loop || false}
            onChange={(value) => setAttributes({
                options: {...options, loop: value}
            })}
        />

        <MuiCheckbox
            label={__('Hide scroll bar')}
            checked={hideScrollBar || false}
            onChange={(value) => setAttributes({
                options: {...options, hideScrollBar: value}
            })}
        />
        <MuiCheckbox
            label={__('Hide navigation')}
            checked={hideNavigation || false}
            onChange={(value) => setAttributes({
                options: {...options, hideNavigation: value}
            })}
        />
        <MuiCheckbox
            label={__('Hide pagination')}
            checked={hidePagination || false}
            onChange={(value) => setAttributes({
                options: {...options, hidePagination: value}
            })}
        />
        </>
    );
}