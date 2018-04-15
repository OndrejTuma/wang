import React from 'react'

import Youtube from './Youtube'

export default () => <div className={'slide1'} style={{
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1,
}}>
    <h2>Slide 1</h2>
    <div style={{
        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: -1,
    }}>
        <Youtube/>
    </div>
</div>