<?php 

$title = isset($attributes['title']) ? $attributes['title'] : '';
$subtitle = isset($attributes['subtitle']) ? $attributes['subtitle'] : '';
$tabs = isset($attributes['tabs']) ? $attributes['tabs'] : [];
$block_id = isset($attributes['blockId']) ? $attributes['blockId'] : '';
$background = isset($attributes['background']) ? $attributes['background'] : [];

$serialized_data = wp_json_encode($attributes);
?>
<script>
	var swiperGalleryData = <?php echo $serialized_data; ?>;			
</script>
<div <?php echo get_block_wrapper_attributes(); ?>" data-uuid="<?php echo esc_attr($block_id); ?>">
</div>