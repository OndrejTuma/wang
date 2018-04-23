import React from 'react'

import {trans} from '../state/Translate'

import Logo from '../static/svg/logo-footshop.svg'

export default () => {
    return <div className={`FsLogo`}>
        <a href={trans.key.common.fsLink()}>
            <Logo width={70}/>
        </a>
    </div>
}