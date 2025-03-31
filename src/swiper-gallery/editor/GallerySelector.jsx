import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CircularProgress from '@mui/material/CircularProgress';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  arrayMove,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableGalleryItem({ item, index, onRemove, onReplace }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: item.mediaId || `item-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <GalleryItem 
        item={item} 
        index={index} 
        onRemove={onRemove} 
        onReplace={onReplace}
        listeners={listeners}
        isDragging={isDragging}
      />
    </div>
  );
}

function GalleryItem({ item, index, onRemove, onReplace, listeners, isDragging }) {
  return (
    <Paper
      elevation={2}
      sx={{
        position: 'relative',
        width: '120px',
        height: '120px',
        overflow: 'hidden',
        borderRadius: 1,
        margin: '4px',
        boxShadow: isDragging ? '0px 4px 10px rgba(0,0,0,0.2)' : undefined,
        transform: isDragging ? 'scale(1.05)' : undefined,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${item.mediaUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Video icon if media is video */}
        {item.mediaType === 'video' && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: '50%',
              padding: '8px',
              pointerEvents: 'none',
            }}
          >
            🎬
          </Box>
        )}
      </Box>
      
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(255,255,255,0.7)',
          borderRadius: '0 0 4px 0',
        }}
      >
        <IconButton 
          size="small" 
          sx={{ cursor: 'grab' }}
          {...listeners}
        >
          <DragIndicatorIcon fontSize="small" />
        </IconButton>
      </Box>
      
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          display: 'flex',
          backgroundColor: 'rgba(255,255,255,0.7)',
          borderRadius: '4px 0 0 0',
        }}
      >
        <MediaUploadCheck>
          <MediaUpload
            onSelect={(media) => onReplace(index, media)}
            allowedTypes={['image', 'video']}
            render={({ open }) => (
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  open();
                }} 
                title={__('Replace media')}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          />
        </MediaUploadCheck>

        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(index);
          }}
          title={__('Remove media')}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default function GallerySelector(props) {
  const { attributes, setAttributes } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const { gallery = [] } = attributes;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleChange = (newGallery) => {
    setAttributes({ gallery: [...newGallery] });
  };

  const handleSelectMedia = (media) => {
    setIsLoading(true);
    
    try {
      const newGallery = media.map((item) => ({
        mediaId: item.id,
        mediaUrl: item.url,
        mediaType: item.type || 'image',
        mediaAlt: item.alt || '',
      }));
      
      handleChange(newGallery);
    } catch (error) {
      console.error("Error processing media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = (index) => {
    const newGallery = [...gallery];
    newGallery.splice(index, 1);
    handleChange(newGallery);
  };

  const handleReplaceItem = (index, media) => {
    const newGallery = [...gallery];
    newGallery[index] = {
      mediaId: media.id,
      mediaUrl: media.url,
      mediaType: media.type || 'image',
      mediaAlt: media.alt || '',
    };
    handleChange(newGallery);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = gallery.findIndex(item => 
        (item.mediaId || `item-${gallery.indexOf(item)}`) === active.id
      );
      const newIndex = gallery.findIndex(item => 
        (item.mediaId || `item-${gallery.indexOf(item)}`) === over.id
      );
      
      const newGallery = arrayMove(gallery, oldIndex, newIndex);
      handleChange(newGallery);
    }
    
    setActiveId(null);
  };

  return (
    <>
      <MediaUploadCheck>
        <MediaUpload
          onSelect={handleSelectMedia}
          allowedTypes={['image', 'video']}
          multiple={true}
          gallery={true}
          addToGallery={gallery.length > 0}
          value={Array.isArray(gallery) ? gallery.map(item => item.mediaId) : []}
          render={({ open }) => (
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={open}
              sx={{ mb: 2 }}
            >
              {gallery.length === 0
                ? __('Select Media')
                : __('Edit Gallery')}
            </Button>
          )}
        />
      </MediaUploadCheck>
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : Array.isArray(gallery) && gallery.length > 0 ? (
        <Box sx={{ mt: 2 }}>
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={gallery.map((item, index) => item.mediaId || `item-${index}`)}
              strategy={rectSortingStrategy}
            >
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 1,
                minHeight: '140px'
              }}>
                {gallery.map((item, index) => (
                  <SortableGalleryItem
                    key={item.mediaId || `item-${index}`}
                    item={item}
                    index={index}
                    onRemove={handleRemoveItem}
                    onReplace={handleReplaceItem}
                  />
                ))}
              </Box>
            </SortableContext>
            
            <DragOverlay>
              {activeId ? (() => {
                const activeItem = gallery.find((item, index) => 
                  (item.mediaId || `item-${index}`) === activeId
                );
                const activeIndex = gallery.findIndex((item, index) => 
                  (item.mediaId || `item-${index}`) === activeId
                );
                
                return activeItem ? (
                  <GalleryItem 
                    item={activeItem}
                    index={activeIndex}
                    onRemove={handleRemoveItem}
                    onReplace={handleReplaceItem}
                    isDragging={true}
                  />
                ) : null;
              })() : null}
            </DragOverlay>
          </DndContext>
          
          <Button
            color="error"
            variant="outlined"
            size="small"
            sx={{ mt: 2 }}
            onClick={() => handleChange([])}
          >
            {__('Clear Gallery')}
          </Button>
        </Box>
      ) : (
        <Paper sx={{ p: 3, textAlign: 'center', color: 'text.secondary', backgroundColor: 'rgba(0,0,0,0.04)' }}>
          {__('No media selected. Click the button above to select images or videos.')}
        </Paper>
      )}
    </>
  );
}