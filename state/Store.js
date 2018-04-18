import {action, observable} from 'mobx'

export class Store {
	mobile_breakpoint = 768
	@observable active = 0
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