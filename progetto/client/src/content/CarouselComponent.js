import React from 'react';
import Slider from 'react-slick';

const CarouselComponent = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} className="d-block w-100" alt={`Slide ${index}`} />
                </div>
            ))}
        </Slider>
    );
};

export default CarouselComponent;
