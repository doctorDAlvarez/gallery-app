import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import Photo from './Photo';

export default function Gallery({handleSearch, data, title, query}) {  //destructuring props.
    let queryString = useParams().query; //accessing URL query parameter with useParams() hook.
    
    // handling the request for the query parameter. 
    useEffect(() => {
        if(queryString !== query){
          handleSearch(queryString)
        } 
    })

   // console.log("galleryrender", queryString)
    console.log(data,query,queryString)
    return ( 
        <div className="photo-container">
            { data.length > 0  ? <h2> Images of :  { queryString || title } </h2> : null}
        <ul>
           { 
            data.length > 0 ? data.map( photo => <Photo photo={photo} key={photo.id} />) : 
            
            <NotFound /> 
            }
        
        </ul>
      </div>
    )
}

