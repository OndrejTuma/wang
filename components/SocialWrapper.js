import React from 'react'
import Socials from './Socials'

import FacebookSVG from '../static/svg/facebook.svg'
import TwitterSVG from '../static/svg/twitter.svg'
import InstagramSVG from '../static/svg/instagram.svg'
import HelpSVG from '../static/svg/help.svg'

const social_networks = [
    {name: 'Facebook', icon: <FacebookSVG width={16} height={16} />, url: 'https://www.facebook.com'},
    {name: 'Twitter', icon: <TwitterSVG width={20} height={20} />, url: 'https://www.facebook.com'},
    {name: 'Instagram', icon: <InstagramSVG width={20} height={20} />, url: 'https://www.facebook.com'},
    {name: 'What?', icon: <HelpSVG width={16} height={16} />, url: 'https://www.facebook.com'},
]

export default () => <div>
    <Socials socials={social_networks}/>
</div>