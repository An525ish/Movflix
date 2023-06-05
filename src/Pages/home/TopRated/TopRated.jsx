import { useState } from 'react';
import Carousel from '../../../components/Carousel/Carousel'
import SwitchTabs from '../../../components/Switchtabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';

const TopRated = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const { data, loading } = useFetch(`/${endpoint}/top_rated`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    return (
        <div>
            <div className="card-title">
                <span>Top Rated</span>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange}/>
            </div>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
        </div>
    )
}

export default TopRated