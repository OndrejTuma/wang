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

        return <HorizontalSlider className={`HorizontalSliderWithControls`}>
            {children.map((slide, i) => {
                const currentSlide = this._getTwoDigitsFormat(i + 1)
                const totalSlides = this._getTwoDigitsFormat(children.length)

                return <div key={i} className={classNames('slide', `slide-${i}`, {active: store.horizontalActive === i})}>
                    <GlitchBg/>
                    <div className={`content`}>
                        <div>
                            <p className={`annotation`}>{`${currentSlide} - ${totalSlides}`}</p>
                            {slide}
                            <SlideControl store={store} position={i} length={children.length}/>
                        </div>
                    </div>
                </div>
            })}
        </HorizontalSlider>
    }
}

const SlideControl = ({position, length, store}) => {
    const {next, prev} = trans.key.horizontalSlider

    let Prev = prev()
    let Next = next()

    if (store.active === 1 && store.horizontalActive === position) {
        Prev = <SnapText delay={1000} duration={1000} text={prev()}/>
        Next = <SnapText delay={1000} duration={1000} text={next()}/>
    }

    return <div className={`controls`}>
        <p
            className={classNames('left', {disabled: position === 0})}
            onClick={e => position > 0 && store.setHorizontalActive(position - 1)}
        >
            {!store.isMobile && <ArrowLeft width={50} height={30}/>} {Prev}
        </p>
        <p
            className={classNames('right', {disabled: position === length - 1})}
            onClick={e => position < length - 1 && store.setHorizontalActive(position + 1)}
        >
            {Next} {!store.isMobile && <ArrowRight width={50} height={30}/>}
        </p>
    </div>
}


export default HorizontalSliderWithControls