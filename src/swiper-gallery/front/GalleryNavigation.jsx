import React from 'react';
import Fab from '@mui/material/Fab';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function GalleryNavigation() {
    const buttonStyle = {
        width: '36px',
        height: '36px',
    };

    const prevArrowStyle = {
        width: '20px',
        height: '20px',
        transform: "translateX(3px)"
    };

    const nextArrowStyle = {
        width: '20px',
        height: '20px',
    };

    return(
        <>
            <div className="swiper-button-prev absolute top-1/2 left-6 z-10" style={buttonStyle}>
                <Fab sx={buttonStyle} size="small" color="primary">
                    <ArrowBackIosIcon sx={{ fontSize: 20 }} style={prevArrowStyle} />
                </Fab> 
            </div>
            <div className="swiper-button-next absolute top-1/2 right-6 z-10" style={buttonStyle}>
                <Fab sx={buttonStyle} size="small" color="primary">
                    <ArrowForwardIosIcon sx={{ fontSize: 'inherit' }} style={nextArrowStyle} />
                </Fab>
            </div>
        </>
    );
}