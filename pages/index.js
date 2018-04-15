import React from 'react'
import Head from 'next/head'
import {Events} from 'react-scroll'

import {withI18next} from '../lib/withI18next'
import css from '../styles/index.scss'

import Slide1 from '../components/Slide1'
import Slide2 from '../components/Slide2'
import Slide3 from '../components/Slide3'
import SocialWrapper from '../components/SocialWrapper'
import Disclaimer from '../components/Disclaimer'
import Controls from '../components/Controls'

export default withI18next(['home', 'common'])(({t, initialI18nStore}) => (
    <div>
        <Head>
            <title>Wang ms</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="https://use.typekit.net/sua1tqu.css"/>
            <style type="text/css">{css}</style>
        </Head>
        <SocialWrapper/>
        <Controls/>

        <Slide1/>
        <Slide2/>
        <Slide3/>
        <Disclaimer/>
    </div>
))
