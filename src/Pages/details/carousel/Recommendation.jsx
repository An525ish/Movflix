import React from 'react'
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/Carousel/Carousel';

const Recommendation = ({ mediaType, id}) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

    return (
        <>
        {data?.results.length > 0 &&  <div>
            <div className="card-title" style={{fontSize : '2rem'}}>
                <span>Recommended</span>
            </div>
            <Carousel data={data?.results} loading={loading} endpoint={mediaType} />
        </div>}
        </>
    )
}

export default Recommendation