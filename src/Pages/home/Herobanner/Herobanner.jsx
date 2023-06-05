import { useState } from 'react'
import './style.scss'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Herobanner = () => {
    const { data, loading } = useFetch('/movie/upcoming');
    const { url } = useSelector(state => state.home);
    const [query, setQuery] = useState('')
    const navigate = useNavigate();

    const queryHandler = (event) => {
        (event.key === 'Enter' || event === 'Searchbtn' && query.length > 0) && navigate(`/search/${query}`)
    }

    return (
        <div className='home'>
            <div className="homebanner">
                {!loading && <img src={url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path} alt="" />}
                <div className='homebanner-content'>
                    <h1 className='header'>Welcome</h1>
                    <span className='sub-header'>Millions of movies, TV shows and people to discover. Explore now</span>
                </div>
                <div className='searchbox'>
                    <input type="text" placeholder='Search for a movie or tv show...' onChange={(e) => setQuery(e.target.value)} onKeyUp={queryHandler} />
                    <button onClick={() => queryHandler('Searchbtn')}>Search</button>
                </div>
            </div>
            <div className='blend-layer'></div>
        </div>
    )
}

export default Herobanner;