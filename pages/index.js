import {Component} from 'react'
import Head from 'next/head'
import {Provider, inject, observer} from 'mobx-react'

import {withI18next} from '../lib/withI18next'
import css from '../styles/index.scss'

import {Store} from '../state/Store'

import Slide1 from '../components/Slide1'
import Slide2 from '../components/Slide2'
import Slide3 from '../components/Slide3'
import Scroller from '../components/Scroller'
import SocialWrapper from '../components/SocialWrapper'
import Disclaimer from '../components/Disclaimer'
import Controls from '../components/Controls'

@inject('store') @observer
class Index extends Component {
    componentDidMount() {
        if (typeof window != 'undefined') {
            window.addEventListener('resize', this._handleResize)
        }
    }
    componentWillUnmount() {
        if (typeof window != 'undefined') {
            window.removeEventListener('resize', this._handleResize)
        }
    }

    _handleResize = e => {
        this.props.store.setViewportWidth()
    }

    render() {
        const {store: {isMobile}} = this.props
        let DisclaimerComponent = ''

        if (!isMobile) {
            DisclaimerComponent = <Disclaimer/>
        }

        return <div>
            <Head>
                <title>Wang ms</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link rel="stylesheet" href="https://use.typekit.net/sua1tqu.css"/>
                <style type="text/css">{css}</style>
                <link rel="stylesheet" href="https://use.typekit.net/mqa6irl.css"/>
            </Head>
            <SocialWrapper/>
            <Controls/>
            <Scroller>
                <Slide1/>
                <Slide2/>
                <Slide3/>
            </Scroller>
            {DisclaimerComponent}
        </div>
    }
}

const IndexWithState = () => <Provider store={new Store()}>
    <Index/>
</Provider>

export default withI18next(['home', 'common', 'horizontalSlider', 'slide2', 'slide3'])(IndexWithState)