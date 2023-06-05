import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { fetchApi } from './utils/api';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Pages/home/Home';
import Explore from './Pages/explore/Explore';
import SearchResult from './Pages/searchResult/SearchResult';
import Details from './Pages/details/Details';
import PageNotFound from './Pages/404/PageNotFound';
import { getApiConfig, getGenres } from './store/homeSlice';
import useFetch from './hooks/useFetch';
import { useDispatch } from 'react-redux';


function App() {

  const { data } = useFetch('/configuration')
  const dispatch = useDispatch()

  const url = { backdrop: data?.images.secure_base_url + 'original',}
  dispatch(getApiConfig(url))

  useEffect(() => {
    genresCall()
  }, [url])
  
  const genresCall = async () => {
        let promises = [];
        let endPoints = ["tv", "movie"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
    };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path='/search/:query' element={<SearchResult />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
