import { useEffect, useState} from 'react';
import './index.css';
import Nav from './Components/Nav';
import apiKey from './config';
import SearchForm from './Components/SearchForm';
import Gallery from './Components/Gallery';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";


export default function App(props) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [planes, setPlanes] = useState([]);
  const [cars, setCars] = useState([]);
  const [boats, setBoats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Collecting data from defaults tags.

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22"planes"%22&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(res => setPlanes(res.photos.photo))
      .then(res => setIsLoading(false))
      .catch( err => console.log("Error fetching data", err))
      
  }, []);
  
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22"cars"%22&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(res => setCars(res.photos.photo))
      .then(res => setIsLoading(false))
      .catch( err => console.log("Error fetching data", err))
      
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22"boats"%22&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(res => setBoats(res.photos.photo))
      .then(res => setIsLoading(false))
      .catch( err => console.log("Error fetching data", err))
      
  }, []);
  
  function handleSearch(queryString) {
    setIsLoading(true);
    setQuery(queryString);
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22${queryString}%22&per_page=24&format=json&nojsoncallback=1`)
    .then(res => res.json())
    .then(res => setData(res.photos.photo))
    .then(res => setIsLoading(false))
    .catch( err => console.log("Error fetching data", err))
    
  }
  
  //routing code
console.log(data, query, isLoading)
  return (
    <BrowserRouter>
      <div className='container'>
        
        <SearchForm handleSearch={handleSearch} />
        
        <Nav />
        
        <Switch>
          
          <Route key="planes" path="/planes">
            {(!isLoading && planes.length > 0) ?
              <Gallery data={planes} title="planes" /> :
              <h2>Loading.....</h2> }
          </Route>

          <Route key="cars" path="/cars">
            {(!isLoading && cars.length > 0) ? 
              <Gallery data={cars} title="cars" /> :
              <h2>Loading.....</h2> }
          </Route>

          <Route key="boats" path="/boats">
            {(!isLoading && boats.length > 0) ? 
              <Gallery data={boats} title="boats" /> :
              <h2>Loading.....</h2> } 
          </Route>

          <Route key="queryString" exact path="/search/:query">
            {!isLoading ? 
              <Gallery data={data} handleSearch={handleSearch} query={query} /> :
              <h2>Loading.....</h2> }   
          </Route>  

          <Route key="root" exact path="/">
              <Redirect to="/planes"/>
          </Route>

          <Route key="404">
              <h2>404 - Resource Not Found</h2>
              <p>Please try again!</p>
          </Route> 

        </Switch>
      
      </div>
    </BrowserRouter>        
    );
}