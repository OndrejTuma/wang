import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {TweenLite} from 'gsap'
import classNames from 'classnames'

import SnapText from './SnapText'
import {trans} from '../state/Translate'

import Carousel from './Carousel'
import GlitchBg from './GlitchBg'

import Logo from '../static/svg/logo-aw.svg'

@inject('store') @observer
class Slide3 extends Component {
    content_id = 'Slide3-content'
    collection_expand_time = .5

    componentDidMount() {
        if (this.props.store.isClient) {
            window.addEventListener('resize', this._handleResize)
            this._recalculateContentDim()
        }
    }

    componentWillUnmount() {
        if (this.props.store.isClient) {
            window.removeEventListener('resize', this._handleResize)
        }
    }

    _animate(container_id, time, props) {
        TweenLite.to(`#${container_id}`, time, props)
    }

    _expand(container_id) {
        if (!this.props.store.isClient) {
            return
        }

        this._animate(container_id, this.collection_expand_time, {width: '100%', height: '100%'})
    }

    _contract(container_id) {
        if (!this.props.store.isClient) {
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
        if (!this.props.store.isClient) {
            return
        }

        const content_elm = document.getElementById(this.content_id)

        const styleHeight = content_elm.style.height
        const styleWidth = content_elm.style.width

        content_elm.style.height = ''
        content_elm.style.width = ''

        this.content_dim = {
            height: content_elm.offsetHeight,
            width: content_elm.offsetWidth,
        }

        content_elm.style.height = styleHeight
        content_elm.style.width = styleWidth
    }

    _handleResize = e => {
        this._recalculateContentDim()

        if (this.props.store.show_collection) {
            return
        }

        const {width, height} = this.content_dim
        TweenLite.set(`#${this.content_id}`, {width, height})
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

    render() {
        const {store: {active, show_collection}} = this.props
        const {slide3: {drop, hide, show, text}, common: {buy, buyLink}} = trans.key

        let Show = ''
        if (active === 2) {
            Show = <SnapText text={show()} delay={1000} duration={1000}/>
        }
        else {
            Show = show()
        }

        if (show_collection) {
            this._expand(this.content_id)
        }
        else {
            this._contract(this.content_id)
        }

        return <div className={classNames('Slide Slide3', {expanded: show_collection, active: active === 2})}>
            <GlitchBg/>
            <div className={`content`} id={this.content_id}>
                {show_collection
                    ? <div className={`collection`}>
                        <p className="annotation">{drop()}</p>
                        <Carousel/>
                        <div className={`cta`}>
                            <a href="#" onClick={this._hide}>{hide()}</a>
                            <a href={buyLink()}>{buy()}</a>
                            <Logo width={300} height={80}/>
                        </div>
                    </div>
                    : <div>
                        <p className="annotation">{drop()}</p>
                        <p>{text()}</p>

                        <div className={`cta`}>
                            <a href="#" onClick={this._show}>{Show}</a>
                        </div>
                    </div>
                }
            </div>
        </div>
    }
}

export default Slide3