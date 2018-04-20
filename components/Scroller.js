import React, {Component} from 'react'
import {Events, scroller, scrollSpy} from 'react-scroll'
import {inject, observer} from 'mobx-react'

@inject('store') @observer
class Scroller extends Component {
    scrollEventInit = false
    scrollerSettings = {
        duration: 1000,
        ignoreCancelEvents: true,
        smooth: true,
    }
    classPrefix = 'Scroller-slide-'

    get slidesCount() {
        const {children} = this.props

        return children ? children.length : 0
    }

    componentDidMount() {
        Events.scrollEvent.register('begin', this._handleScrollStart)
        Events.scrollEvent.register('end', this._handleScrollEnd)

        scrollSpy.update()
    }
    componentWillUnmount() {
        Events.scrollEvent.remove('begin')
        Events.scrollEvent.remove('end')
    }

    _activateScrollListening() {
        if (typeof window != 'undefined') {
            window.addEventListener('touchmove', this._handleTouch)
            window.addEventListener('wheel', this._handleScroll)
            window.addEventListener('keydown', this._handleKeyDown)
        }
    }
    _deactivateScrollListening() {
        if (typeof window != 'undefined') {
            window.removeEventListener('touchmove', this._handleTouch)
            window.removeEventListener('wheel', this._handleScroll)
            window.removeEventListener('keydown', this._handleKeyDown)
        }
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
        let scrollDown = e.deltaY > 0

        scrollDown ? this.next() : this.prev()
    }
    _handleScrollEnd = () => {
        if (this.scrollEventInit) {
            this._activateScrollListening()
            this.lastTouchY = null
        }
    }
    _handleScrollStart = () => {
        if (this.scrollEventInit) {
            this._deactivateScrollListening()
        }
    }
    _handleTouch = e => {
        e.preventDefault()
        if (!e.touches.length) {
            return
        }

        let touch = e.touches[0]

        if (this.lastTouchY) {
            this.lastTouchY > touch.clientY
                ? this.next()
                : this.prev()
        }

        this.lastTouchY = touch.clientY
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
    _setScrolling(value) {
        if (
            (value && this.scrollEventInit) ||
            (!value && !this.scrollEventInit)
        ) { return }

        this.scrollEventInit = value
        value
            ? this._activateScrollListening()
            : this._deactivateScrollListening()
    }

    /**
     * Goes to next slide
     */
    next() {
        const {active} = this.props.store
        const slides = this.slidesCount - 1

        this._setActive(active < slides ? active + 1 : slides)
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
     * @param {Object.<string, string>} scrollerSettings
     * @private
     */
    slideTo(slide, scrollerSettings = {}) {
        scroller.scrollTo(
            this.classPrefix + slide,
            Object.assign(this.scrollerSettings, scrollerSettings)
        )
    }

    render() {
        const {children, store: {active, isMobile}} = this.props

        if (typeof window != 'undefined') {
            this._setScrolling(!isMobile)
            this.slideTo(active)
        }

        return <div className={`Scroller`}>
            {children.map((child, i) => <div key={i} id={this.classPrefix + i}>{child}</div>)}
        </div>
    }
}

export default Scroller