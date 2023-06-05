import Carousel from '../../../components/Carousel/Carousel'
import useFetch from '../../../hooks/useFetch';

const Similar = ({ mediaType, id }) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

    return (
        <>
            { data?.results.length > 0 && <div>
                <div className="card-title" style={{fontSize : '2rem'}}>
                    <span>You may also like</span>
                </div>
                <Carousel data={data?.results} loading={loading} endpoint={mediaType} />
            </div>}
        </>
    )
}

export default Similar