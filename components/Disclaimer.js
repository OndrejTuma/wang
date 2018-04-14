import React from 'react'

import Hearth from '../static/svg/heart.svg'

export default () => <div style={{
    position: 'fixed',
    left: 0,
    bottom: 0,
    transform: 'rotate(-90deg) translate(0, 100%)',
    transformOrigin: '0 100%',
}}>
    <p style={{
        margin: 0,
        padding: '10px 20px',
    }}>made with <Hearth width={20} height={20} style={{
        margin: '0 5px -5px 5px',
        fill: '#cf181f'
    }}/> for sneakers</p>
</div>