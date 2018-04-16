import React, {Component} from 'react'
import { translate } from 'react-i18next'
import {inject, observer} from 'mobx-react'

import Dot from '../static/svg/dot-single.svg'
import Triangle from '../static/svg/triangle-right.svg'

import Timer from './Timer'

@inject('store') @observer
class Controls extends Component {
    render() {
        const { t } = this.props

        return <div className={`Controls`}>
            <div className={'home'} onClick={e => this.props.store.setActive(0)}>
               <Dot width={15} height={15}/> {t('home')}
            </div>
            <div className={'buy'}>
                <Triangle width={15} height={15}/> {t('buy')}
            </div>
            <div className={'collection'}>
                <Triangle width={15} height={15}/> {t('collection')}
            </div>
            <div className={'time'}>
                <Timer/>
                <p>A AW 004 S18</p>
            </div>
        </div>
    }
}

export default translate('common')(Controls)