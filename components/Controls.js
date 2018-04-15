import React from 'react'
import { translate } from 'react-i18next'

import Timer from './Timer'

const Controls = ({ t }) => <div className={`Controls`}>
    <p className={'home'}>{t('home')}</p>
    <p className={'buy'}>{t('buy')}</p>
    <p className={'collection'}>{t('collection')}</p>
    <div className={'time'}>
        <Timer/>
        <p>A AW 004 S18</p>
    </div>
</div>

export default translate('common')(Controls)