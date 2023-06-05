import React from 'react'
import ReactPlayer from 'react-player'
import './style.scss'

const VideoPopup = ({ id, setshowVideo, setVideoId, showVideo }) => {
    const hidePopup = () => {
        setshowVideo(false);
        setVideoId(null);
    };
    return (
        <div className={`videoPopup ${showVideo && 'blur'}`}>
            <div className="video">
            <span className='close' onClick={hidePopup}>Close</span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${id}`}
                    width='100%'
                    height='100%'
                />
            </div>
        </div>
    )
}

export default VideoPopup