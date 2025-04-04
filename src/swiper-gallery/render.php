<?php 
$clientId = isset($attributes['clientId']) ? $attributes['clientId'] : '';
$title = isset($attributes['title']) ? $attributes['title'] : '';
$subtitle = isset($attributes['subtitle']) ? $attributes['subtitle'] : '';
$gallery = isset($attributes['gallery']) ? $attributes['gallery'] : [];
$options = isset($attributes['options']) ? $attributes['options'] : [];

$slidesPerView = isset($options['slidesPerView']) ? (int)$options['slidesPerView'] : 1;
$spaceBetween = isset($options['spaceBetween']) ? (int)$options['spaceBetween'] : 0;
$effect = isset($options['effect']) ? $options['effect'] : 'slide';
$autoplay = isset($options['autoplay']) && $options['autoplay'] ? true : false;
$loop = isset($options['loop']) && $options['loop'] ? true : false;
$delay = isset($options['delay']) ? (int)$options['delay'] : 3000;
$speed = isset($options['speed']) ? (int)$options['speed'] : 500;
$hideScrollBar = isset($options['hideScrollBar']) && $options['hideScrollBar'] ? true : false;
$hideNavigation = isset($options['hideNavigation']) && $options['hideNavigation'] ? true : false;
$hidePagination = isset($options['hidePagination']) && $options['hidePagination'] ? true : false;
$showFigcaption = isset($options['showFigcaption']) && $options['showFigcaption'] ? true : false;
$figcaptionPosition = isset($options['figcaptionPosition']) ? $options['figcaptionPosition'] : 'bottom';
$openModal = isset($options['openModal']) && $options['openModal'] ? true : false;
$galleryHeightDesktop = isset($options['galleryHeightDesktop']) ? $options['galleryHeightDesktop'] : '500px';
$galleryHeightTablet = isset($options['galleryHeightTablet']) ? $options['galleryHeightTablet'] : '400px';
$galleryHeightMobile = isset($options['galleryHeightMobile']) ? $options['galleryHeightMobile'] : '300px';

$serialized_data = wp_json_encode($attributes);
$figcaptionPositionClass = $figcaptionPosition === 'top' ? 'top-0' : 'bottom-0';

?>

<div <?php echo get_block_wrapper_attributes(); ?> id="<?php echo esc_attr($clientId); ?>">
    <div class="swiper-gallery-container" style="height: <?php echo esc_attr($galleryHeightDesktop); ?>; width: 100%; position: relative; overflow: hidden;">
        <style>
            @media (max-width: 960px) {
                [data-gallery="<?php echo esc_attr($clientId); ?>"] .swiper-gallery-container {
                    height: <?php echo esc_attr($galleryHeightTablet); ?>;
                }
            }
            @media (max-width: 600px) {
                [data-gallery="<?php echo esc_attr($clientId); ?>"] .swiper-gallery-container {
                    height: <?php echo esc_attr($galleryHeightMobile); ?>;
                }
            }
            
            [data-gallery="<?php echo esc_attr($clientId); ?>"] .swiper-slide img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            <?php if ($openModal): ?>
            [data-gallery="<?php echo esc_attr($clientId); ?>"] .swiper-slide img {
                cursor: pointer;
            }
            <?php endif; ?>
        </style>


        <div class="swiper-container swiper">
            <div class="swiper-wrapper">
                <?php if (is_array($gallery) && count($gallery) > 0): ?>
                    <?php foreach ($gallery as $image): ?>
                        <div class="swiper-slide" style="position: relative; height: 100%;">
                            <img 
                                src="<?php echo esc_url($image['mediaUrl']); ?>" 
                                alt="<?php echo esc_attr($image['mediaAlt'] ?? ''); ?>"
                                <?php if ($openModal): ?>data-open-modal="true"<?php endif; ?>
                            />
                            
                            <?php if ($showFigcaption && !empty($image['mediaAlt'])): ?>
                                <figcaption class="absolute left-0 w-full p-2 text-white bg-black/50 text-sm z-10 <?php echo esc_attr($figcaptionPositionClass); ?>">
                                    <?php echo esc_html($image['mediaAlt']); ?>
                                </figcaption>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
            
            <?php if (!$hideScrollBar): ?>
                <div class="swiper-scrollbar"></div>
            <?php endif; ?>
            
            <?php if (!$hideNavigation): ?>
                <div class="swiper-button-prev absolute top-1/2 left-6 z-10" style="width: 36px; height: 36px;">
                </div>
                <div class="swiper-button-next absolute top-1/2 right-6 z-10" style="width: 36px; height: 36px;">
                </div>
            <?php endif; ?>
            
            <?php if (!$hidePagination): ?>
                <div class="swiper-pagination"></div>
            <?php endif; ?>
        </div>
    </div>
    
    <script type="application/json" class="block-data">
        <?php echo $serialized_data; ?>
    </script>
</div>