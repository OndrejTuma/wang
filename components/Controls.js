import React, {Component} from 'react'
import {animateScroll} from 'react-scroll'
import {inject, observer} from 'mobx-react'

import SnapText from './SnapText'
import Timer from './Timer'

import {trans} from '../state/Translate'
const {home, buy, buyLink, collection} = trans.key.common

import Dot from '../static/svg/dot-single.svg'
import Triangle from '../static/svg/triangle-right.svg'

@inject('store') @observer
class Controls extends Component {

    get Home() {
        return <div className={'home'} onClick={e => this.props.store.setActive(0)}>
            <Dot width={15} height={15}/> <SnapText text={home()}/>
        </div>
    }

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
        let Time = ''

        if (!isMobile) {
            Home = this.Home
            Time = this.Time
        }

        return <div className={`Controls`}>
            {Home}
            {this.Buy}
            {this.Collection}
            {Time}
        </div>
    }
}

export default Controls