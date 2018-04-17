import React, {Component} from 'react'
import {translate} from 'react-i18next'


import HorizontalSliderWithControls from './HorizontalSliderWithControls'

class Slide2 extends Component {
    render() {
        return <div className={'Slide Slide2'}>
            <HorizontalSliderWithControls>
                <div>
                    <h2>
                        <span className={`glitch`} data-text="Alexander Wang">Alexander Wang</span>
                    </h2>
                </div>
                <div>
                    <h2>
                        <span className={`glitch`} data-text="Lama Su">Lama Su</span>
                    </h2>
                </div>
                <div>
                    <h2>Marky!</h2>
                    <p>Ještě to neni!</p>
                </div>
            </HorizontalSliderWithControls>
        </div>
    }
}



export default translate('slide2')(Slide2)