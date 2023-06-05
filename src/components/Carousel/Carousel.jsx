import { useRef } from 'react';
import { useSelector } from "react-redux"
import './style.scss'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"
import CircleRating from "../CircleRating/CircleRating";
import dayjs from "dayjs";
import Genres from '../Genres/Genres';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PosterFallback from "../../assets/no-poster.png";
import { Link, useNavigate } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Carousel = ({ data, loading, endpoint }) => {
    const navigate = useNavigate();
    const { url } = useSelector(state => state.home)
    const cardWrapper = useRef(null);

    const navigation = (dir) => {
        const container = cardWrapper.current;
        const scrollAmount =
            dir === 'left'
                ? container.scrollLeft - (container.offsetWidth + 16)
                : container.scrollLeft + (container.offsetWidth + 16);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skItem = () => {
        return (
            <div className="skeletonItem card">
                <div className="imgContainer skeleton"></div>
                <div className="textContainer">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };


    return (
        <>
            {!loading ?
                <div>
                    <div className='wrapper'>
                        <div className="card-wrapper" ref={cardWrapper}>
                            <div className="cards-container">
                                {data?.map((item) => {
                                    const posterUrl = item.poster_path
                                        ? url.backdrop + item?.poster_path
                                        : PosterFallback;

                                    return (
                                        <div className="card" key={item.id} onClick={() =>
                                            navigate(`/${item.media_type || endpoint}/${item.id}`)
                                        }>
                                            <div className="imgContainer">
                                                <LazyLoadImage src={posterUrl} alt="smthng" effect='blur' />
                                                <CircleRating rating={item.vote_average.toFixed(1)} />
                                                <Genres data={item.genre_ids.slice(0, 2)} />
                                            </div>
                                            <div className="textContainer">
                                                <p className='title'>{item.title || item.name}</p>
                                                <p className='date'>{dayjs(item.release_date || item.first_air_date).format("MMM D, YYYY")}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <BsFillArrowLeftCircleFill className='left arrow' onClick={() => navigation('left')} />
                        <BsFillArrowRightCircleFill className='right arrow' onClick={() => navigation('right')} />
                    </div>
                </div> :
                <div className="loadingSkeleton">
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                </div>
            }
        </>
    )
}

export default Carousel