import { useState } from 'react';
import Carousel from '../../../components/Carousel/Carousel'
import SwitchTabs from '../../../components/Switchtabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';

const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const { data, loading } = useFetch(`/${endpoint}/popular`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    return (
        <div>
            <div className="card-title">
                <span>What's Popular</span>
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange}/>
            </div>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
        </div>
    )
}

export default Popular