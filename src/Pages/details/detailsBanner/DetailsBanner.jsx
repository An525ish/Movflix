import { useSelector } from 'react-redux';
import './style.scss';
import CircleRating from '../../../components/CircleRating/CircleRating';
import { PlayIcon } from '../../../components/PlayIcon';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PosterFallback from "../../../assets/no-poster.png";
import VideoPopup from '../../../components/VideoPopup/VideoPopup';
import { useState } from 'react';

const DetailsBanner = ({data, video, loading, credits}) => {
  const { url } = useSelector(state => state.home)
  const backdropUrl = url.backdrop + data?.backdrop_path
  const posterUrl = data?.poster_path ? url.backdrop + data?.poster_path : PosterFallback 
  const director = credits?.crew?.filter((f) => f.job === "Director");
  const writer = credits?.crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer");
  const [showVideo, setshowVideo] = useState(false)
  const [videoId, setVideoId] = useState(null)
  return (
    <>
      <div className='banner'>
        <img src={backdropUrl} alt="" />
      </div>
        {showVideo && <VideoPopup id={videoId} setshowVideo={setshowVideo} setVideoId={setVideoId} showVideo={showVideo}/>}
      <div className="opacity-layer"></div>
      {!loading ? <div className={`details-content ${showVideo && 'blur'}`}>
        <div className='poster-block'>
          <LazyLoadImage src={posterUrl} alt="" effect='blur' />
        </div>
        <div className='content-block'>
          <h2 className='title'>{data?.name || data?.title} ({(data?.release_date || data?.first_air_date)?.split('-')[0]})</h2>
          <p className='tagline'>{data?.tagline}</p>
          <p className='genres'>{data?.genres?.map((genre) => <span key={genre.id} className='genre'> {genre.name} </span>)}</p>
          <div className='rating-box'>
            <CircleRating
              rating={data?.vote_average.toFixed(1)}
            />
            <div
              className="playbtn"
            onClick={() => {
              setshowVideo(true)
              setVideoId(video.key);
            }}
            >
              <PlayIcon />
              <span className="text">
                Watch Trailer
              </span>
            </div>
          </div>
          <div className='overview'>
            <h3 className='title'>Overview</h3>
            <p className='content'>{data?.overview}</p>
          </div>
          <div className='info-container'>
            {data?.status && <div className='info no-border'><span className='bold'>Status:{' '}</span><span className='fade'>{data?.status}</span></div>}
            {data?.release_date && <div className='info no-border'><span className='bold'>Release Date:{' '}</span><span className='fade'>{data?.release_date}</span></div>}
            {data?.runtime && <div className='info no-border'><span className='bold'>Runtime:{' '}</span><span className='fade'>{data?.runtime}</span></div>}
          </div>
          {director && director.length > 0 && <div className='info'>
            <span className='bold'>Director:{' '}</span>
            {director?.map((d, i) => (
              <span key={i} className='fade'>
                {d.name}
                {director.length - 1 !== i && ", "}
              </span>
            ))}
          </div>}
          {writer && writer.length > 0 && <div className='info'>
            <p><span className='bold'>Writer:{' '} </span><span>{writer?.map((d, i) => (
              <span key={i} className='fade'>
                {d.name}
                {writer.length -1 !== i && ", "}
              </span>
            ))}</span></p>
          </div>}
          {data && data?.created_by?.length > 0 && ( <div className="info">
              <span className="text bold">
                Creator:{" "}
              </span>
              <span className="text">
                {data?.created_by?.map((d, i) => (
                    <span key={i}>
                      {d.name}
                      {data?.created_by.length -1 !== i && ", "}
                    </span>
                  )
                )}
              </span>
            </div>)}
        </div>
      </div> :
        <div className="detailsBannerSkeleton">
          <div className="left skeleton"></div>
          <div className="right">
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row skeleton"></div>
          </div>
        </div>
      }
    </>
  )
}

export default DetailsBanner;