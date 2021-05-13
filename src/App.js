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
  const [isLoading, setIsLoading] = useState();

  //Collecting data from defaults tags.

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22"planes"%22&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(res => { setPlanes(res.photos.photo); setIsLoading(false)})
      .catch( err => console.log("Error fetching data", err))

    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22"cars"%22&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(res => { setCars(res.photos.photo); setIsLoading(false)})
      .catch( err => console.log("Error fetching data", err))

    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22"boats"%22&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(res => { setBoats(res.photos.photo); setIsLoading(false)})
      .catch( err => console.log("Error fetching data", err))
  }, []);
  
  function handleSearch(queryString) {
    setIsLoading(true);
    setQuery(queryString);
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22${queryString}%22&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(res => {setData(res.photos.photo); setIsLoading(false)})
      .catch( err => console.log("Error fetching data", err))
    
  }
  
  //routing code
  return (
    <BrowserRouter>
      <div className='container'>
        
        <SearchForm handleSearch={handleSearch} />
        
        <Nav />
        {
        
        isLoading ? 
        
        <h2>Loading...</h2> :
        
        <Switch>
          
          <Route key="planes" path="/planes">
              <Gallery data={planes} title="planes" loading={isLoading}/>
          </Route>

          <Route key="cars" path="/cars">
              <Gallery data={cars} title="cars" loading={isLoading}/>
          </Route>

          <Route key="boats" path="/boats">
              <Gallery data={boats} title="boats" loading={isLoading} /> 
          </Route>

          <Route key="queryString" exact path="/search/:query">
              <Gallery data={data} handleSearch={handleSearch} query={query} loading={isLoading}/>
          </Route>  

          <Route key="root" exact path="/">
              <Redirect to="/planes"/>
          </Route>

          <Route key="404">
              <h2>404 - Resource Not Found</h2>
              <p>Please try again!</p>
          </Route> 

        </Switch>

        }
     
      </div>
    </BrowserRouter>        
    );
}