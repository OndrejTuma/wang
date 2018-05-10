import React, {Component} from 'react'
import YouTube from 'react-youtube'
import {inject, observer} from 'mobx-react'

@inject('store') @observer
export default class Youtube extends Component {
    youtube = null;

    _playerReady = e => {
        this.youtube = e.target

        this.youtube.mute()
    };
    _playerEnded = () => {
        this.youtube.playVideo()
    };

    render() {
        const {store: {active}} = this.props;

        if (this.youtube) {
            active === 0
                ? this.youtube.playVideo()
                : this.youtube.pauseVideo()
        }

        return <YouTube
            videoId={`eT9eyoXSq-g`}
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
                    rel: 0,
                },
            }}
            onReady={this._playerReady}
            onEnd={this._playerEnded}
            /*
            onStateChange={this._ytStateChange}
            */
        />
    }
}