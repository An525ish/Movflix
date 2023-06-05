import  { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.scss";
import { fetchApi } from "../../utils/api";
import PosterFallback from "../../assets/no-poster.png";
// import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CircleRating from "../../components/CircleRating/CircleRating";
import Genres from "../../components/Genres/Genres";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import 'react-lazy-load-image-component/src/effects/blur.css';


const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  const navigate = useNavigate()
  const {url} = useSelector(state=>state.home)

  const fetchInitialData = () => {
    setLoading(true);
    fetchApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {/* {loading && <Spinner initial={true} />} */}
      {!loading && (
        <>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data?.total_results > 1
                  ? "results"
                  : "result"
                  } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
              // loader={<Spinner />}
              >
                {data?.results.map((item) => {
                  if (item.media_type === "person") return;
                  const posterUrl = item.poster_path
                    ? url.backdrop + item?.poster_path
                    : PosterFallback;
                  return (
                    <div className="card" key={item.id} onClick={() =>
                      navigate(`/${item.media_type}/${item.id}`)
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
            </>
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

export default SearchResult;