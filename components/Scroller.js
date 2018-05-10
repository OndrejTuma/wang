import React, {Component} from 'react'
import {Events, scroller, scrollSpy} from 'react-scroll'
import {inject, observer} from 'mobx-react'

import {scrollerSettings} from '../config'

@inject('store') @observer
class Scroller extends Component {
    config = {
        distance: .3    //toleration for scroller to move to prev/next (vh)
    }
    scrolling = false
    slides = []

    classPrefix = 'Scroller-slide-'

    get slidesCount() {
        const {children} = this.props

        return children ? children.length : 0
    }

    _handleKeyDown = e => {
        let keyCode = e.keyCode

        // spacebar, page down, arrow down
        if ([32, 34, 40].indexOf(keyCode) >= 0) {
            this.next()
        }
        // page up, arrow up
        else if ([33, 38].indexOf(keyCode) >= 0) {
            this.prev()
        }
        else {
            // home, end
            if ([35, 36].indexOf(keyCode) >= 0) {
                let slide = keyCode === 35 ? this.slidesCount - 1 : 0

                this._setActive(slide)
            }
        }
    }
    _handleScroll = e => {
        e.preventDefault()

        if (this.scrolling) {
            return
        }
        //TODO: tolerance
        e.deltaY > 0
            ? this.next()
            : this.prev()
    }
    _handleTouchMove = e => {
        const {store: {active, isMobile, viewport_height}} = this.props

        if (!isMobile || !e.touches || !e.touches.length) {
            return
        }

        const {clientY} = e.touches[0]
        let is_scrolling_down = true

        if (this.lastTouchY) {
            is_scrolling_down = this.lastTouchY > clientY
        }
        this.lastTouchY = clientY

        const {offsetTop} = this.slides[active]
        const scroll_top = window.scrollY || window.pageYOffset
        const tolerance = Math.round(viewport_height * this.config.distance)

        // next slide
        if (is_scrolling_down && offsetTop < scroll_top - tolerance) {
            this.next()
        }
        // prev slide
        if (is_scrolling_down === false && offsetTop > scroll_top + tolerance) {
            this.prev()
        }
    }
    _scrollEnded = () => {
        this.scrolling = false
    }
    _scrollStarted = () => {
        this.scrolling = true
    }

    /**
     * @param {int} slide
     * @private
     */
    _setActive(slide) {
        const {store: {active}} = this.props

        if (slide === active) {
            return
        }

        this.props.store.setActive(slide)
    }

    /**
     * Goes to next slide
     */
    next() {
        const {active} = this.props.store
        const slides = this.slidesCount - 1

        this._setActive(active < slides ? active + 1 : slides)

        if (active === slides) {
            this.props.store.showCollection()
        }
    }

    /**
     * Goes to previous slide
     */
    prev() {
        const {active} = this.props.store

        this._setActive(active > 0 ? active - 1 : 0)
    }

    /**
     * Scrolls to given slide on client
     * @param {int} slide
     * @private
     */
    slideTo(slide) {
        const {store: {isMobile}} = this.props

        if (isMobile) {
            return
        }

        scroller.scrollTo(this.classPrefix + slide, scrollerSettings)
    }

    componentDidMount() {
        window.addEventListener('touchmove', this._handleTouchMove)
        window.addEventListener('wheel', this._handleScroll)
        window.addEventListener('keydown', this._handleKeyDown)

        Events.scrollEvent.register('begin', this._scrollStarted)
        Events.scrollEvent.register('end', this._scrollEnded)

        scrollSpy.update()
    }

    componentWillUnmount() {
        window.removeEventListener('touchmove', this._handleTouchMove)
        window.removeEventListener('wheel', this._handleScroll)
        window.removeEventListener('keydown', this._handleKeyDown)

        Events.scrollEvent.remove('begin')
        Events.scrollEvent.remove('end')
    }

    render() {
        const {children, store: {active, isClient}} = this.props

        if (isClient) {
            this.slideTo(active)
        }

        return <div className={`Scroller`}>
            {children.map((child, i) => <div ref={elm => this.slides.push(elm)} key={i}
                                             id={this.classPrefix + i}>{child}</div>)}
        </div>
    }
}

export default Scroller