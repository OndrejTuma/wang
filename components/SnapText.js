import {Component} from 'react'

class SnapText extends Component {
    state = {
        text: ''
    }
    possible = "-+*/|}{[]~\\\":;?/.><=+-_)(*&^%$#@!)}"
    character_animation_length = 40
    timeouts = []

    _setTimeout(i, text) {
        this.timeouts.push(
            setTimeout(() => this._tick(text), i * this.character_animation_length)
        )
    }
    _tick(text) {
        clearTimeout(this.timeouts.shift())
        this.setState({text})
    }

    onHover = e => {
        // running animation
        if (this.timeouts.length) {
            return
        }

        const {text} = this.props

        this.runSnap(text)
    }
    /**
     * Scrolling letter functionality
     * Snaps text with possible characters
     * @param {string} text
     * @param {string} possible
     */
    runSnap(text, possible = this.possible) {
        let textRandom = ''

        for (let i = 0; i < text.length + 1; i++) {
            textRandom = text.substr(0, i)

            for (var j = i; j < text.length; j++) {
                textRandom += possible.charAt(Math.floor(Math.random() * possible.length))
            }

            this._setTimeout(i, textRandom)

            textRandom = ''
        }
    }

    componentDidMount() {
        const {text} = this.props

        if (!text) {
            return
        }

        this.setState({text})
    }
    render() {
        return <span className={`SnapText`} onMouseEnter={this.onHover}>{this.state.text}</span>
    }
}

export default SnapText