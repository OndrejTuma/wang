import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {TweenLite} from 'gsap'

@inject('store') @observer
class VerticalSlider extends Component {
    classPrefix = 'VerticalScroller-slide-'

    get slidesCount() {
        const {children} = this.props

        return children ? children.length : 0
    }

    /**
     * @param {int} slide
     * @private
     */
    _setActive(slide) {
        const {store: {verticalActive: active}} = this.props

        if (slide === active) {
            return
        }
        console.log('_setActive vertical', slide, active);

        this.props.store.setVerticalActive(slide)
    }

    /**
     * Goes to next slide
     */
    next() {
        const {verticalActive: active} = this.props.store
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
        TweenLite.to(`#VerticalSlider`, 1, {x: `-${slide * 100}%`})
    }

    render() {
        const {children, store: {verticalActive: active}} = this.props

        if (typeof window != 'undefined') {
            this.slideTo(active)
        }

        return <div className={`VerticalSlider`}>
            <div id={`VerticalSlider`} className={`container`}>
                <div className={`slides`}>
                    {children.map((child, i) => <div key={i} id={this.classPrefix + i}>{child}</div>)}
                </div>
            </div>
        </div>
    }
}

export default VerticalSlider