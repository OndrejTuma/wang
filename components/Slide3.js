import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {translate} from 'react-i18next'
import {TweenLite} from 'gsap'
import classNames from 'classnames'
import Slider from 'react-slick'

import GlitchBg from './GlitchBg'

import Logo from '../static/svg/logo-aw.svg'

@inject('store') @observer
class Slide3 extends Component {
    content_id = 'Slide3-content'
    collection_expand_time = .5
    carousel_settings = {
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

    get client() {
        return typeof window != 'undefined'
    }

    componentDidMount() {
        if (!this.client) {
            return
        }

        this._recalculateContentDim()
    }

    _animate(container_id, time, props) {
        TweenLite.to(`#${container_id}`, time, props)
    }
    _expand(container_id) {
        if (!this.client) {
            return
        }

        this._animate(container_id, this.collection_expand_time, {width: '100%', height: '100%'})
    }
    _contract(container_id) {
        if (!this.client) {
            return
        }

        if (this.content_dim) {
            const {height, width} = this.content_dim
            this._animate(container_id, this.collection_expand_time, {width, height})
        }
        else {
            this._recalculateContentDim()
        }
    }
    _recalculateContentDim() {
        const content_elm = document.getElementById(this.content_id)

        this.content_dim = {
            height: content_elm.offsetHeight,
            width: content_elm.offsetWidth,
        }
    }
    _show = e => {
        e.preventDefault()

        const {store: {show_collection}} = this.props

        if (show_collection) {
            return
        }

        this.props.store.showCollection()
    }
    _hide = e => {
        e.preventDefault()

        const {store: {show_collection}} = this.props

        if (!show_collection) {
            return
        }

        this.props.store.hideCollection()
    }
    _processChangeCollectionShow(show) {
        const {store: {show_collection}} = this.props

        if (
            (show && show_collection)
            || (!show && !show_collection)
        ) {

        }
    }

    render() {
        const {store: {show_collection}, t} = this.props

        if (show_collection) {
            this._expand(this.content_id)
        }
        else {
            this._contract(this.content_id)
        }

        return <div className={classNames('Slide Slide3', {expanded: show_collection})}>
            <GlitchBg/>
            <div className={`content`} id={this.content_id}>
                {show_collection
                    ? <div className={`collection`}>
                        <p className="annotation">{t('drop')}</p>
                        <Slider {...this.carousel_settings}>
                            {[
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
                            ].map((img, i) => <div key={i}>
                                <a href={img.url}>
                                    <img src={img.thumb} alt={img.alt}/>
                                </a>
                            </div>)}
                        </Slider>
                        <div className={`cta`}>
                            <a href="#" onClick={this._hide}>{t('hide')}</a>
                        </div>
                        <Logo width={300} height={80}/>
                    </div>
                    : <div>
                        <p className="annotation">{t('drop')}</p>
                        <Logo width={300} height={100}/>

                        <p>{t('text1')}</p>
                        <p>{t('text2')}</p>

                        <div className={`cta`}>
                            <a href="#" onClick={this._show}>{t('show')}</a>
                        </div>
                    </div>
                }
            </div>
        </div>
    }
}

export default translate('slide3')(Slide3)