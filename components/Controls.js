import React, {Component} from 'react'
import {animateScroll} from 'react-scroll'
import {inject, observer} from 'mobx-react'
import FacebookProvider, { Like } from 'react-facebook'

import FsLogo from './FsLogo'
import SnapText from './SnapText'
import Timer from './Timer'

import {fbAppId} from '../config'
import {trans} from '../state/Translate'
const {home, buy, buyLink, collection} = trans.key.common
const {fbLink} = trans.key.og

import Dot from '../static/svg/dot-single.svg'
import Triangle from '../static/svg/triangle-right.svg'

@inject('store') @observer
class Controls extends Component {
    get Buy() {
        return <div className={'buy'}>
            <a href={buyLink()}>
                <Triangle width={15} height={15}/> <SnapText text={buy()}/>
            </a>
        </div>
    }
    get Collection() {
        return <div className={'collection'}>
            <a href="#collection" onClick={this._collectionClick}>
                <Triangle width={15} height={15}/> <SnapText text={collection()}/>
            </a>
        </div>
    }
    get Like() {
        return <div className={`like`}>
            <FacebookProvider appId={fbAppId}>
                <Like className="facebook-like" href={fbLink()} layout="button"/>
            </FacebookProvider>
        </div>
    }
    get Logo() {
        return <FsLogo/>
    }
    get Home() {
        return <div className={'home'} onClick={e => this.props.store.setActive(0)}>
            <Dot width={15} height={15}/> <SnapText text={home()}/>
        </div>
    }
    get Time() {
        return <div className={'time'}>
            <Timer/>
            <i><SnapText text={'A AW 004 S18'}/></i>
        </div>
    }


    _collectionClick = e => {
        e.preventDefault()

        this.props.store.setActive(2)
        this.props.store.showCollection()
        //TODO: come up with better solution
        animateScroll.scrollToBottom()
    }

    render() {
        const {store: {isMobile}} = this.props
        let Home = ''
        let Like = ''
        let Logo = ''
        let Time = ''

        if (!isMobile) {
            Home = this.Home
            Like = this.Like
            Logo = this.Logo
            Time = this.Time
        }

        return <div className={`Controls`}>
            {Logo}
            {Home}
            {this.Buy}
            {this.Collection}
            {Time}
            {Like}
        </div>
    }
}

export default Controls