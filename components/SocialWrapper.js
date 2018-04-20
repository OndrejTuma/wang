import React from 'react'
import Socials from './Socials'

import FacebookSVG from '../static/svg/facebook.svg'
import TwitterSVG from '../static/svg/twitter.svg'
import InstagramSVG from '../static/svg/instagram.svg'

const social_networks = [
    {translation_key: 'facebook', icon: <FacebookSVG width={16} height={16} />},
    {translation_key: 'twitter', icon: <TwitterSVG width={16} height={16} />},
    {translation_key: 'instagram', icon: <InstagramSVG width={16} height={16} />},
    {translation_key: 'lang'},
]

export default () => <Socials socials={social_networks}/>