import  { useState } from 'react'
import './style.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PlayIcon } from '../../../components/PlayIcon';
import VideoPopup from '../../../components/VideoPopup/VideoPopup';
import 'react-lazy-load-image-component/src/effects/blur.css';

const OfficialVideo = ({ video, loading }) => {
    const [showVideo, setshowVideo] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <>
        { video?.length > 0 && <div className='officialVid'>
            <div className="main-title">Official Videos</div>
            {showVideo && <VideoPopup id={videoId} setshowVideo={setshowVideo} setVideoId={setVideoId} showVideo={showVideo} />}
            {!loading ? <div className="officialVid-container">
                {video?.map(vid => {
                    return (
                        <div className="vid" key={vid?.id}
                            onClick={() => {
                                setshowVideo(true)
                                setVideoId(vid?.key);
                            }}>
                            <div className='thumbnail'>
                                <LazyLoadImage src={`https://img.youtube.com/vi/${vid?.key}/mqdefault.jpg`} alt="" effect='blur' />
                                <div
                                    className="playbtn"
                                >
                                    <PlayIcon />
                                </div>
                            </div>
                            <div className="vidTitle">
                                <h3 className='title'>{vid?.name}</h3>
                            </div>
                        </div>)
                })}
            </div>
                : <div className="videoSkeleton">
                    {loadingSkeleton()}
                    {loadingSkeleton()}
                    {loadingSkeleton()}
                    {loadingSkeleton()}
                </div>}
        </div>}
        </>
    )
}

export default OfficialVideo