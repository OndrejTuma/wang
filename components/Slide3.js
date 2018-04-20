import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {TweenLite} from 'gsap'
import classNames from 'classnames'

import {trans} from '../state/Translate'

import Carousel from './Carousel'
import GlitchBg from './GlitchBg'

import Logo from '../static/svg/logo-aw.svg'

@inject('store') @observer
class Slide3 extends Component {
    content_id = 'Slide3-content'
    collection_expand_time = .5

    get client() {
        return typeof window != 'undefined'
    }

    componentDidMount() {
        if (!this.client) {
            return
        }

        window.addEventListener('resize', this._handleResize)
        this._recalculateContentDim()
    }
    componentWillUnmount() {
        if (typeof window != 'undefined') {
            window.removeEventListener('resize', this._handleResize)
        }
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
        if (!this.client) {
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
        const {store: {show_collection}} = this.props
        const {drop, hide, show, text1, text2} = trans.key.slide3

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
                        <p className="annotation">{drop()}</p>
                        <Carousel/>
                        <div className={`cta`}>
                            <a href="#" onClick={this._hide}>{hide()}</a>
                        </div>
                        <Logo width={300} height={80}/>
                    </div>
                    : <div>
                        <p className="annotation">{drop()}</p>
                        <Logo width={300} height={100}/>

                        <p>{text1()}</p>
                        <p>{text2()}</p>

                        <div className={`cta`}>
                            <a href="#" onClick={this._show}>{show()}</a>
                        </div>
                    </div>
                }
            </div>
        </div>
    }
}

export default Slide3