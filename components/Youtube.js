import React, {Component} from 'react'
import YouTube from 'react-youtube'

export default class Youtube extends Component {
    _ytReady = event => {
        this.youtube = event.target
console.log(this.youtube);

        //this.youtube.playVideo()
    }

    render() {
        return <YouTube
            videoId={`zAaOW1FVLKU`}
            opts={{
                height: '100%',
                width: '100%',
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    disablekb: 1,
                    iv_load_policy: 3,
                    loop: 1,
                    modestbranding: 1,
                    showinfo: 0,
                },
            }}
            onReady={this._ytReady}
            /*
            onEnd={this._ytEnded}
            onStateChange={this._ytStateChange}
            */
        />
    }
}