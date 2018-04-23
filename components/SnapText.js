import {Component} from 'react'

class SnapText extends Component {
    state = {
        text: ''
    }
    possible = "-+*/|}{[]~\\\":;?/.><=+-_)(*&^%$#@!)}"
    char_animation_length = 50
    timeouts = []

    _setTimeout(text, delay) {
        this.timeouts.push(
            setTimeout(() => this._tick(text), delay)
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

        this.runSnap()
    }
    /**
     * Scrolling letter functionality
     * Snaps text with possible characters
     * @param {int} duration - in ms
     * @param {string} possible
     */
    runSnap(duration, possible = this.possible) {
        const {text} = this.state
        let textRandom = ''

        const ratio = duration
            ? Math.round(duration / (text.length * this.char_animation_length))
            : 1

        const cycles = ratio > 1
            ? ratio * text.length
            : text.length

        for (let i = 0; i <= cycles; i++) {
            let resolvedLetters = 0

            if (i > 0) {
                resolvedLetters = ratio > 1
                    ? Math.ceil(i / ratio)
                    : i
            }

            textRandom = text.substr(0, resolvedLetters)

            for (var j = resolvedLetters; j < text.length; j++) {
                textRandom += possible.charAt(Math.floor(Math.random() * possible.length))
            }

            this._setTimeout(textRandom, i * this.char_animation_length)

            textRandom = ''
        }
    }

    componentDidMount() {
        const {text, delay, duration} = this.props

        if (!text) {
            return
        }

        this.setState({text})
        setTimeout(() => this.runSnap(duration), delay || 0)
    }
    componentWillUnmount() {
        this.timeouts.map(timeout => clearTimeout(timeout))
    }
    render() {
        return <span className={`SnapText`}>{this.state.text}</span>
    }
}

export default SnapText