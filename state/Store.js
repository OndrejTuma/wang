import {action, computed, observable} from 'mobx'

export class Store {
    mobile_breakpoint = 768
    @observable viewport_width = 0
    @observable active = 0
    @observable horizontalActive = 0
    @observable show_collection = false

    get isClient() {
        return typeof window != 'undefined'
    }

    @computed
    get isMobile() {
        if (!this.isClient) {
            return true //mobile first, man!
        }

        return this.viewport_width <= this.mobile_breakpoint
    }

    @action
    hideCollection() {
        this.show_collection = false
    }
    @action
    setActive(slide) {
        this.active = slide
    }
    @action
    setHorizontalActive(slide) {
        this.horizontalActive = slide
    }
    @action
    setViewportWidth(width) {
        this.viewport_width = width
    }
    @action
    showCollection() {
        this.show_collection = true
    }
}