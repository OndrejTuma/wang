import React from 'react'

export default ({socials}) =>
    <div className={`Socials`} style={{
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 9,
    }}>
        <ul style={{
            listStyle: 'none',
            padding: 0,
        }}>
            {socials.length && socials.map(social =>
                <li key={social.name} style={{marginBottom: 5}}>
                    <a href={social.url} title={social.name} style={{
                        background: '#fff',
                        borderRadius: '50%',
                        display: 'block',
                        height: 30,
                        textAlign: 'center',
                        paddingTop: 7,
                        width: 30,
                    }}>{social.icon || social.name}</a>
                </li>
            )}
        </ul>
    </div>