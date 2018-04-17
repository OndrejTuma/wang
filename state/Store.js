import {action, observable} from 'mobx'

export class Store {
	@observable active = 0
	@observable horizontalActive = 0

	@action
	setActive(slide) {
		this.active = slide
	}
	@action
	setHorizontalActive(slide) {
		this.horizontalActive = slide
	}
}