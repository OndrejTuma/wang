import React from 'react'
import Carousel from 'react-slick'

const slides = [
    {
        url: '//placehold.it/800x1600',
        alt: 'image',
        thumb: '//placehold.it/400x800',
    },
    {
        url: '//placehold.it/800x1600',
        alt: 'image',
        thumb: '//placehold.it/400x800',
    },
    {
        url: '//placehold.it/800x1600',
        alt: 'image',
        thumb: '//placehold.it/400x800',
    },
    {
        url: '//placehold.it/800x1600',
        alt: 'image',
        thumb: '//placehold.it/400x800',
    },
]

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ],
}

export default () => <Carousel {...settings}>
    {slides.map((img, i) => <div key={i}>
        <a href={img.url}>
            <img src={img.thumb} alt={img.alt}/>
        </a>
    </div>)}
</Carousel>