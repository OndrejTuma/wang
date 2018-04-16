import React, {Component} from 'react'
import {inject} from 'mobx-react'
import {translate} from 'react-i18next'
import classNames from 'classnames'

import ArrowLeft from '../static/svg/arrow-left.svg'
import ArrowRight from '../static/svg/arrow-right.svg'
import VerticalSlider from './VerticalSlider'

const slides = [
    <h2>Alexander Wang</h2>,
    <h2>Lama Su</h2>,
]

@inject('store')
class Slide2 extends Component {
    render() {
        const {store, t} = this.props

        return <div className={'Slide Slide2'}>
            <VerticalSlider>
                {slides.map((slide, i) => (
                    <div key={i} className={`slide-${i}`}>
                        <div className="bg"></div>
                        <div className="content">
                            {slide}
                            <SlideControl t={t} store={store} position={i} length={slides.length}/>
                        </div>
                    </div>
                ))}
            </VerticalSlider>
        </div>
    }
}

const SlideControl = ({position, length, t, store}) => {
    return <div className={`controls`}>
        <p
            className={classNames('left', {disabled: position === 0})}
            onClick={e => position > 0 && store.setVerticalActive(position - 1)}
        >
            <ArrowLeft width={50} height={30}/> {t('prev')}
        </p>
        <p
            className={classNames('right', {disabled: position === length - 1})}
            onClick={e => position < length - 1 && store.setVerticalActive(position + 1)}
        >
            {t('next')} <ArrowRight width={50} height={30}/>
        </p>
    </div>
}

export default translate('slide2')(Slide2)