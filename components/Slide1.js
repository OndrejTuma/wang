import {Component} from 'react'
import {inject, observer} from 'mobx-react'
import GlitchBg from './GlitchBg'
import classNames from 'classnames'
import FacebookProvider, { Like } from 'react-facebook'

import FsLogo from './FsLogo'
import Youtube from './Youtube'

import {trans} from '../state/Translate'
import {fbAppId} from '../config'
import Logo from '../static/svg/logo-aw.svg'

@inject('store') @observer
class Slide1 extends Component {
    get GlitchBg() {
        return <GlitchBg/>
    }
    get Like() {
        return <FacebookProvider appId={fbAppId}>
            <Like className="facebook-like" href={trans.key.og.fbLink()} layout="button"/>
        </FacebookProvider>
    }
    get Logo() {
        return <FsLogo/>
    }
    get Youtube() {
        return <div className={`youtube`}>
            <Youtube/>
        </div>
    }
    render() {
        const {store: {isMobile, active}} = this.props
        let YoutubeComponent = ''
        let LikeButton = ''
        let FsLogoComponent = ''

        if (isMobile) {
            YoutubeComponent = this.GlitchBg
            LikeButton = this.Like
            FsLogoComponent = this.Logo
        }
        else {
            YoutubeComponent = this.Youtube
        }

        return <div className={classNames('Slide Slide1', {active: active === 0})}>
            <div className={`content`}>
                <div className={`child`}>
                    {FsLogoComponent}
                </div>
                <div className={`child`}>
                    <Logo width={400} height={150}/>
                </div>
                <div className={`child`}>
                    {LikeButton}
                </div>
            </div>
            {YoutubeComponent}
        </div>
    }
}

export default Slide1