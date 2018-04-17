import React, {Component} from 'react'
import { translate } from 'react-i18next'
import {inject, observer} from 'mobx-react'

import Dot from '../static/svg/dot-single.svg'
import Triangle from '../static/svg/triangle-right.svg'

import Timer from './Timer'

@inject('store') @observer
class Controls extends Component {
    _collectionClick = e => {
        e.preventDefault()

        this.props.store.setActive(2)
        this.props.store.showCollection()
    }

    render() {
        const { t } = this.props

        return <div className={`Controls`}>
            <div className={'home'} onClick={e => this.props.store.setActive(0)}>
               <Dot width={15} height={15}/> {t('home')}
            </div>
            <div className={'buy'}>
                <a href={t('buyLink')}>
                    <Triangle width={15} height={15}/> {t('buy')}
                </a>
            </div>
            <div className={'collection'}>
                <a href="#collection" onClick={this._collectionClick}>
                    <Triangle width={15} height={15}/> {t('collection')}
                </a>
            </div>
            <div className={'time'}>
                <Timer/>
                <i>A AW 004 S18</i>
            </div>
        </div>
    }
}

export default translate('common')(Controls)