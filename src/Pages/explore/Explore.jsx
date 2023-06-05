import  { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import { fetchApi } from "../../utils/api";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CircleRating from "../../components/CircleRating/CircleRating";
import dayjs from "dayjs";
import Genres from "../../components/Genres/Genres";
import 'react-lazy-load-image-component/src/effects/blur.css';

let filters = {};

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const { mediaType } = useParams();
    const navigate = useNavigate();
    const { url } = useSelector(state => state.home)

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    const fetchInitialData = () => {
        setLoading(true);
        fetchApi(`/discover/${mediaType}`, filters).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        fetchApi(
            `/discover/${mediaType}?page=${pageNum}`,
            filters
        ).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };

    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);

    const onChange = (selectedItems, action) => {
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

        setPageNum(1);
        fetchInitialData();
    };

    return (
        <div className="explorePage">
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "tv"
                            ? "Explore TV Shows"
                            : "Explore Movies"}
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            // closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {/* {loading && <Spinner initial={true} />} */}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                // loader={<Spinner />}
                            >
                                {data?.results?.map((item) => {
                                    if (item.media_type === "person") return;
                                    const posterUrl = item.poster_path
                                        ? url.backdrop + item?.poster_path
                                        : PosterFallback;
                                    return (
                                      <div className="card" key={item.id} onClick={() =>
                                        navigate(`/${mediaType}/${item.id}`)
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
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
        </div>
    );
};

export default Explore;