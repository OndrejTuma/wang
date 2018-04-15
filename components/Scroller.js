import React, {Component} from 'react'
import {Events, scrollSpy} from 'react-scroll'

class Scroller extends Component {
    state = {
        active: 0,
        sliding: false,
    }

    get slidesCount() {
        const {children} = this.props

        return children ? children.length : 0
    }

    componentDidMount() {
        Events.scrollEvent.register('begin', this._handleScrollStart)
        Events.scrollEvent.register('end', this._handleScrollEnd)

        scrollSpy.update()

        this._activateScrollListening()
    }

    _activateScrollListening() {
        if (typeof window !== 'undefined') {
            //window.addEventListener('scroll', this._handleScroll, true)
            window.addEventListener('touchmove', this._handleTouch)
            window.addEventListener('wheel', this._handleScroll)
            window.addEventListener('keydown', this._handleKeyDown)
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

                this.setState({active: slide})
            }
        }
    }
    _handleScroll = e => {
        e.preventDefault()
        let scrollDown = e.deltaY > 0

        if (!this.state.sliding) {
            scrollDown ? this.next() : this.prev()
        }
    }
    _handleScrollEnd = () => {
        let { sliding } = this.state

        if (sliding) {
            this.setState({sliding: false})
        }

        this._activateScrollListening()
        this.lastTouchY = null
    }
    _handleScrollStart = () => {}
    _handleTouch = e => {
        e.preventDefault()
        if (!e.touches.length || this.state.sliding) {
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
    _setActive(slide) {
        if (slide === this.state.active) {
            return
        }

        this.setState({sliding: true})

        setTimeout(() => {
            this.setState({
                active: slide,
                sliding: false,
            })
        }, 1000)
    }

    next() {
        const {active} = this.state
        const slides = this.slidesCount - 1

        this._setActive(active < slides ? active + 1 : slides)
    }
    prev() {
        const {active} = this.state

        this._setActive(active > 0 ? active - 1 : 0)
    }

    render() {
        const {children} = this.props
        const {active, sliding} = this.state

        return <div className={`Scroller`}>
            {children && children.filter((child, i) => active === i)}
        </div>
    }
}

export default Scroller