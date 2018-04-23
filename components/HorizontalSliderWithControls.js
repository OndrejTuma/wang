import React, {Component} from 'react'
import classNames from 'classnames'
import {inject, observer} from 'mobx-react'

import {trans} from '../state/Translate'

import ArrowLeft from '../static/svg/arrow-left.svg'
import ArrowRight from '../static/svg/arrow-right.svg'

import HorizontalSlider from './HorizontalSlider'
import SnapText from './SnapText'
import GlitchBg from './GlitchBg'

@inject('store') @observer
class HorizontalSliderWithControls extends Component {
    _getTwoDigitsFormat(number) {
        return number > 9 ? number : `0${number}`
    }

    render() {
        const {children, store} = this.props
        const {next, prev} = trans.key.horizontalSlider

        return <HorizontalSlider className={`HorizontalSliderWithControls`}>
            {children.map((slide, i) => {
                const currentSlide = this._getTwoDigitsFormat(i + 1)
                const totalSlides = this._getTwoDigitsFormat(children.length)
                const isActive = store.active === 1 && store.horizontalActive === i

                return <div key={i} className={classNames('slide', `slide-${i}`, {active: store.horizontalActive === i})}>
                    <GlitchBg/>
                    <div className={`content`}>
                        <div>
                            <p className={`annotation`}>{`${currentSlide} - ${totalSlides}`}</p>
                            {slide}
                            <div className={`controls`}>
                                <p
                                    className={classNames('left', {disabled: i === 0})}
                                    onClick={e => i > 0 && store.setHorizontalActive(i - 1)}
                                >
                                    {!store.isMobile && <ArrowLeft width={50} height={30}/>}
                                    {isActive
                                        ? <SnapText delay={1000} duration={1000} text={prev()}/>
                                        : prev()
                                    }
                                </p>
                                <p
                                    className={classNames('right', {disabled: i === children.length - 1})}
                                    onClick={e => i < children.length - 1 && store.setHorizontalActive(i + 1)}
                                >
                                    {isActive
                                        ? <SnapText delay={1000} duration={1000} text={next()}/>
                                        : next()
                                    }
                                    {!store.isMobile && <ArrowRight width={50} height={30}/>}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </HorizontalSlider>
    }
}

export default HorizontalSliderWithControls