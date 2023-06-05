import Herobanner from './Herobanner/Herobanner'
import Popular from './Popular/Popular'
import TopRated from './TopRated/TopRated'
import Trending from './Trending/Trending'


const Home = () => {
  return (
    <div>
      <Herobanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default Home