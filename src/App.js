import { useEffect, useState} from 'react';
import './index.css';
import Nav from './Components/Nav';
import apiKey from './config';
import SearchForm from './Components/SearchForm';
import Gallery from './Components/Gallery';
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";


export default function App(props) {
  const [data, setData] = useState();
  const [query, setQuery] = useState();
  const [planes, setPlanes] = useState([]);
  const [cars, setCars] = useState([]);
  const [boats, setBoats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Collecting data from defaults tags.

  useEffect(() => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22"planes"%22&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(res => setPlanes(res.photos.photo))
      .catch( err => console.log("Error fetching data", err))
  }, []);
  
  useEffect(() => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22"cars"%22&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(res => setCars(res.photos.photo))
      .catch( err => console.log("Error fetching data", err))
  }, []);

  useEffect(() => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22"boats"%22&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(res => setBoats(res.photos.photo))
      .catch( err => console.log("Error fetching data", err))
  }, []);
  
  useEffect(() => {
      setIsLoading(true);
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22${query}%22&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(res => setData(res.photos.photo))
      .then(res => setIsLoading(false))
      .catch( err => console.log("Error fetching data", err))
  }, [query]);

  function handleSearch(query) {
      setQuery(query);  
  }

  return (
    <BrowserRouter>
      <div className='container'>
        <SearchForm handleSearch={handleSearch} />
        <Nav />
        <Switch>
          <Route path="/planes">
            <Gallery data={planes} title="planes" />
          </Route>
          <Route path="/cars">
            <Gallery data={cars} title="cars"/>
          </Route>
          <Route path="/boats">
            <Gallery data={boats} title="boats"/>
          </Route>
          <Route path="/search/:query">
            { isLoading ? <h3>LOADING IMAGES....please wait</h3> :
              <Gallery data={data} handleSearch={handleSearch} query={query} /> }    
          </Route>        
        </Switch>
      </div>
    </BrowserRouter>        
    );
}
