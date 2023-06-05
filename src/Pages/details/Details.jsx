import DetailsBanner from './detailsBanner/DetailsBanner'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import TopCast from './topCast/topCast';
import OfficialVideo from './officialVideos/officialVideo';
import Similar from './carousel/Similar';
import Recommendation from './carousel/Recommendation';

const Details = () => {
  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}`)
  const { data: credits, loading:creditsLoading } = useFetch(`/${mediaType}/${id}/credits`)
  const { data:video, loading:videoLoading } = useFetch(`/${mediaType}/${id}/videos`);

  return (
    <div>
      <DetailsBanner data={data} loading={loading} credits={credits} video={video?.results?.[0]}/>
      <TopCast loading={creditsLoading} credits={credits}/>
      <OfficialVideo video={video?.results} loading={videoLoading}/>
      <Similar mediaType={mediaType} id={id} loading={loading}/>
      <Recommendation mediaType={mediaType} id={id} loading={loading}/>
    </div>
  )
}

export default Details