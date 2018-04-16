import {action, observable} from 'mobx'

export class Store {
	@observable active = 1
	@observable verticalActive = 0

	@action
	setActive(slide) {
		this.active = slide
	}
	@action
	setVerticalActive(slide) {
		this.verticalActive = slide
	}
}