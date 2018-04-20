import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {TweenLite} from 'gsap'
import classNames from 'classnames'

@inject('store') @observer
class HorizontalSlider extends Component {
    id = 'HorizontalSlider'
    classPrefix = 'HorizontalSlider-slide-'

    get slidesCount() {
        const {children} = this.props

        return children ? children.length : 0
    }

    /**
     * @param {int} slide
     * @private
     */
    _setActive(slide) {
        const {store: {horizontalActive: active}} = this.props

        if (slide === active) {
            return
        }

        this.props.store.setHorizontalActive(slide)
    }

    /**
     * Goes to next slide
     */
    next() {
        const {horizontalActive: active} = this.props.store
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
        TweenLite.to(`#${this.id}`, 1, {x: `-${slide * 100}%`})
    }

    render() {
        const {className, children, store: {isClient, horizontalActive: active}} = this.props

        if (isClient) {
            this.slideTo(active)
        }

        return <div className={classNames(this.id, className)}>
            <div id={this.id} className={`container`}>
                <div className={`slides`}>
                    {children.map((child, i) => <div key={i} id={this.classPrefix + i}>{child}</div>)}
                </div>
            </div>
        </div>
    }
}

export default HorizontalSlider