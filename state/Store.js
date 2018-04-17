import {action, observable} from 'mobx'

export class Store {
	@observable active = 2
	@observable horizontalActive = 0
	@observable show_collection = false

	@action
	setActive(slide) {
		this.active = slide
	}
	@action
	setHorizontalActive(slide) {
		this.horizontalActive = slide
	}
	@action
	hideCollection() {
		this.show_collection = false
	}
	@action
	showCollection() {
		this.show_collection = true
	}
}