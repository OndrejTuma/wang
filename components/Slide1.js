import {Component} from 'react'
import {inject, observer} from 'mobx-react'
import GlitchBg from './GlitchBg'

import Youtube from './Youtube'

import Logo from '../static/svg/logo-aw.svg'

@inject('store') @observer
class Slide1 extends Component {
    render() {
        const {store: {isMobile}} = this.props

        let YoutubeComponent = isMobile
            ? <GlitchBg/>
            : <div className={`youtube`}>
                <Youtube/>
            </div>

        return <div className={'Slide Slide1'}>
            <div className={`content`}>
                <Logo width={400} height={150}/>
            </div>
            {YoutubeComponent}
        </div>
    }
}

export default Slide1