import { useSelector } from 'react-redux'
import './style.scss'
import PosterFallback from "../../../assets/avatar.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';
const TopCast = ({ credits, loading }) => {
    const { url } = useSelector(state => state.home)

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className='cast-container'>
            <div className="main-title">Top Cast</div>
            {!loading ? <div className="castCard-container" >
                {credits?.cast?.map(credit => {
                    const posterUrl = credit?.profile_path ? url.backdrop + credit?.profile_path : PosterFallback
                    return (
                        <div className="castCard" key={credit?.id} >
                            <div className='poster'>
                                <LazyLoadImage src={posterUrl} alt="" />
                            </div>
                            <div className="castInfo">
                                <h3 className='title'>{credit?.name}</h3>
                                <p className="character">{credit?.character}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
                : <div className="castSkeleton">
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                    {skeleton()}
                </div>}
        </div>
    )
}

export default TopCast