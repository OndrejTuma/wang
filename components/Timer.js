import React, {Component} from 'react'

export default class Timer extends Component {
    state = {
        time: 0
    }

    get time() {
        let {time: seconds} = this.state

        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor(seconds / 60 - hours * 60)
        seconds = seconds - hours * 3600 - minutes * 60

        let time = []
        time.push(hours > 9 ? hours : `0${hours}`)
        time.push(minutes > 9 ? minutes : `0${minutes}`)
        time.push(seconds > 9 ? seconds : `0${seconds}`)

        return time.join(':')
    }

    componentDidMount() {
        this._startTicking()
    }

    _startTicking() {
        clearInterval(this.interval)

        this.interval = setInterval(this._tick,1000)
    }
    _tick = () => {
        this.setState({time: this.state.time + 1})
    }

    render() {
        return <div>{this.time}</div>
    }
}