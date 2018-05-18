import {Component} from 'react'
import Slick from 'react-slick'
import {inject} from 'mobx-react'
import Lightbox from 'react-image-lightbox'

const slides = [
    {
        url: 'static/images/products/desktop/1.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/1.jpg',
    },
    {
        url: 'static/images/products/desktop/2.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/2.jpg',
    },
    {
        url: 'static/images/products/desktop/3.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/3.jpg',
    },
    {
        url: 'static/images/products/desktop/4.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/4.jpg',
    },
    {
        url: 'static/images/products/desktop/5.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/5.jpg',
    },
    {
        url: 'static/images/products/desktop/6.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/6.jpg',
    },
    {
        url: 'static/images/products/desktop/7.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/7.jpg',
    },
    {
        url: 'static/images/products/desktop/8.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/8.jpg',
    },
    {
        url: 'static/images/products/desktop/9.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/9.jpg',
    },
    {
        url: 'static/images/products/desktop/10.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/10.jpg',
    },
    {
        url: 'static/images/products/desktop/11.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/11.jpg',
    },
    {
        url: 'static/images/products/desktop/12.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/12.jpg',
    },
    {
        url: 'static/images/products/desktop/13.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/13.jpg',
    },
    {
        url: 'static/images/products/desktop/14.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/14.jpg',
    },
    {
        url: 'static/images/products/desktop/15.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/15.jpg',
    },
    {
        url: 'static/images/products/desktop/16.jpg',
        alt: 'image',
        thumb: 'static/images/products/mobile/16.jpg',
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
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
    ],
}

@inject('store')
class Carousel extends Component {
    state = {
        isOpen: false,
        photoIndex: 0,
    }

    _openLightBox(e, i) {
        e.preventDefault()

        this.setState({
            isOpen: true,
            photoIndex: i
        })
    }

    render() {
        const {isOpen, photoIndex} = this.state

        return <div>
            {isOpen && (
                <Lightbox
                    mainSrc={slides[photoIndex].url}
                    nextSrc={slides[(photoIndex + 1) % slides.length].url}
                    prevSrc={slides[(photoIndex + slides.length - 1) % slides.length].url}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    onMovePrevRequest={() =>
                        this.setState({
                            photoIndex: (photoIndex + slides.length - 1) % slides.length,
                        })
                    }
                    onMoveNextRequest={() =>
                        this.setState({
                            photoIndex: (photoIndex + 1) % slides.length,
                        })
                    }
                />
            )}
            <Slick {...settings}>
                {slides.map((img, i) => <div key={i}>
                    <a href={img.url} onClick={e => this._openLightBox(e, i)}>
                        <img src={img.thumb} alt={img.alt}/>
                    </a>
                </div>)}
            </Slick>
        </div>
    }
}

export default Carousel