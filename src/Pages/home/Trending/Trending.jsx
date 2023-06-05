import { useState } from 'react';
import Carousel from '../../../components/Carousel/Carousel'
import SwitchTabs from '../../../components/Switchtabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import './style.scss'

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");
    const { data, loading } = useFetch(`/trending/movie/${endpoint}`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        <div>
            <div className="card-title">
                <span>Trending</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange}/>
            </div>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
        </div>
    )
}

export default Trending