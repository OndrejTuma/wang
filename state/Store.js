import {action, observable} from 'mobx'

export class Store {
	@observable active = 0
	@observable sliding = false

	@action
	setActive(slide) {
		this.active = slide
	}
	@action
	setSliding(sliding = true) {
		this.sliding = sliding
	}
	@action
	setSlide(slide) {
        this.sliding = true

        setTimeout(() => {
            this.sliding = false
            this.active = slide
        }, 1000)
	}
}