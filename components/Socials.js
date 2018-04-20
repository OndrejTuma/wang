import React from 'react'
import {trans} from '../state/Translate'

export default ({socials}) => <div className={`Socials`}>
    <ul>
        {socials.length && socials.map((social, i) => {
                const {label, url} = trans.key.socials[social.translation_key]

                return <li key={i}>
                    <a href={url()} title={label()} target={`_blank`}>{social.icon || label()}</a>
                </li>
            }
        )}
    </ul>
</div>