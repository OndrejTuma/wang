import React from 'react'

export default ({socials}) =>
    <div className={`Socials`}>
        <ul style={{
            listStyle: 'none',
            padding: 0,
        }}>
            {socials.length && socials.map(social =>
                <li key={social.name}>
                    <a href={social.url} title={social.name}>{social.icon || social.name}</a>
                </li>
            )}
        </ul>
    </div>