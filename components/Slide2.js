import React, {Component} from 'react'
import {inject} from 'mobx-react'
import {translate} from 'react-i18next'


import HorizontalSliderWithControls from './HorizontalSliderWithControls'

@inject('store')
class Slide2 extends Component {
    render() {
        return <div className={'Slide Slide2'}>
            <HorizontalSliderWithControls>
                <h2>Alexander Wang</h2>
                <h2>Lama Su</h2>
                <div>
                    <h2>Marky!</h2>
                    <p>Ještě to neni!</p>
                </div>
            </HorizontalSliderWithControls>
        </div>
    }
}



export default translate('slide2')(Slide2)