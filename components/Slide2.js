import React, {Component} from 'react'
import {translate} from 'react-i18next'

import HorizontalSliderWithControls from './HorizontalSliderWithControls'

class Slide2 extends Component {
    render() {
        const {t} = this.props

        return <div className={'Slide Slide2'}>
            <HorizontalSliderWithControls>
                {[0, 1].map(slide => {
                    const heading = t(`slide${slide}.heading`)
                    const text = t(`slide${slide}.text`)

                    return <div key={slide}>
                        <h2>
                            <span className={`glitch`} data-text={heading}>{heading}</span>
                        </h2>
                        <p>{text}</p>
                    </div>
                })}
            </HorizontalSliderWithControls>
        </div>
    }
}



export default translate('slide2')(Slide2)