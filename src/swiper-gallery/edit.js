import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { getBlockType } from '@wordpress/blocks';

import SwiperOptions from './editor/SwiperOptions';
import GallerySelector from './editor/GallerySelector';
import SwiperGallery from './front/SwiperGallery';


export default function Edit(props) {

	const { attributes, setAttributes, clientId } = props;
	useEffect(() => {
        const blockType = getBlockType('cmk/swiper-gallery');
        const defaultOptions = blockType?.attributes?.options?.default || {};
        
        if (!attributes.gallery || !Array.isArray(attributes.gallery)) {
            setAttributes({ gallery: [] });
        }
        if (!attributes.options || typeof attributes.options !== 'object') {
            setAttributes({ options: { ...defaultOptions } });
        }
    }, [attributes.gallery, attributes.options, setAttributes]);

	return (
		<>
			<InspectorControls>
				
				<PanelBody title={__('Block title')} initialOpen={true}>
					<TextControl
						placeholder="Title"
						value={attributes.title || ''}
						onChange={(value) => setAttributes({ title: value })}
					/>
					<TextControl
						placeholder="Subtitle"
						value={attributes.subtitle || ''}
						onChange={(value) => setAttributes({ subtitle: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Medias')} initialOpen={false}>
					<GallerySelector {...props}/>
				</PanelBody>
				<PanelBody title={__('Gallery options')} initialOpen={false}>
					<SwiperOptions {...props} />
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<SwiperGallery attributes={attributes} clientId={clientId} />
			</div>
		</>

	);
	
}