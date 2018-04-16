import React from 'react'

import Youtube from './Youtube'

import LogoAW from '../static/svg/logo-aw.svg'

export default () => <div className={'Slide Slide1'}>
    <div className={`content`}>
        <LogoAW width={320} height={87}/>
    </div>
    <div className={`youtube`}>
        <Youtube/>
    </div>
</div>