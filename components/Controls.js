import React, {Component} from 'react'
import { translate } from 'react-i18next'
import {inject, observer} from 'mobx-react'

import Timer from './Timer'

@inject('store') @observer
class Controls extends Component {
    render() {
        const { t } = this.props

        return <div className={`Controls`}>
            <p className={'home'} onClick={e => this.props.store.setSlide(0)}>{t('home')}</p>
            <p className={'buy'}>{t('buy')}</p>
            <p className={'collection'}>{t('collection')}</p>
            <div className={'time'}>
                <Timer/>
                <p>A AW 004 S18</p>
            </div>
        </div>
    }
}

export default translate('common')(Controls)