import React from 'react'
import Head from 'next/head'

import {withI18next} from '../lib/withI18next'

import SocialWrapper from '../components/SocialWrapper'
import Disclaimer from '../components/Disclaimer'

export default withI18next(['home', 'common'])(({t, initialI18nStore}) => (
    <div>
        <Head>
            <title>Wang ms</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <SocialWrapper/>
        <h1>{t('home:welcome')}</h1>
        <p>{t('common:integrates_react-i18next')}</p>
        <Disclaimer/>
    </div>
))
