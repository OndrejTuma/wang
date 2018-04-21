import React from 'react'
import {inject, observer} from 'mobx-react'


const GlitchBg = inject('store')(observer(({store: {isMobile}}) => {
    const number_of_backgrounds = isMobile ? 3 : 5

    return <div className="glitchBg">
        {Array.from({length: number_of_backgrounds}, (v, i) => <div key={i} className="glitchBg__img"></div>)}
    </div>
}))

export default GlitchBg