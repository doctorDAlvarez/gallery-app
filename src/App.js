import { useEffect, useState, useRef} from 'react';
import './index.css';
import Nav from './Nav';
import apiKey from './config';
import SearchForm from './SearchForm';
import Gallery from './Gallery';
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";


export default function App(props) {
  const [data, setData] = useState();
  const [query, setQuery] = useState('planes');
  const [isLoading, setIsLoading] = useState(false);
  const dataTagsRef = useRef({});
 
  useEffect(() => {
    const tags = ["planes", "cars", "boats"];
    console.log('Effect 1');
    tags.forEach(
      tag => {
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22${tag}%22&per_page=24&format=json&nojsoncallback=1`)
        .then(res => res.json())
        .then(res => dataTagsRef.current[tag] = res.photos.photo)
        .catch( err => console.log("Error fetching data", err))
      }
    );
  },[]);

  useEffect(() => {
      setIsLoading(true);
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=%22${query}%22&per_page=24&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(res => setData(res.photos.photo))
      .catch( err => console.log("Error fetching data", err))
      .then(setIsLoading(false))
  }, [query]);

  function handleSearch(query) {
      setQuery(query);  
  }
  console.log(dataTagsRef.current.planes, isLoading)

  return (
    <BrowserRouter>
      <div className='container'>
        <SearchForm handleSearch={handleSearch} />
        <Nav />
        <Switch>
          <Route key="planes" exact path="/planes">
            <Gallery data={dataTagsRef.current.planes} title="planes" />
          </Route>
          <Route key="cars" exact path="/cars">
            <Gallery data={dataTagsRef.current.cars} title="cars"/>
          </Route>
          <Route key="boats" exact path="/boats">
            <Gallery data={dataTagsRef.current.boats} title="boats"/>
          </Route>
          <Route key="queryString" path="/search/:query">   
            <Gallery data={data} handleSearch={handleSearch} query={query} />
          </Route>
          <Route key="root" exact path="/">
            <Gallery data={dataTagsRef.current.planes} title="planes" />
          </Route>    
        </Switch>
      </div>
    </BrowserRouter>        
    );
}
