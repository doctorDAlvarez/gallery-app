import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import Photo from './Photo';

export default function Gallery({handleSearch, data, title, query, loading}) {  //destructuring props.
    let queryString = useParams().query; //accessing URL query parameter with useParams() hook.
    
    // handling the request for the query parameter. 
    useEffect(() => {
        if(queryString !== query){
          handleSearch(queryString)
        } 
    })

    return ( 
      
      <div className="photo-container">
      
        <h2> Images of: <span>{ queryString || title }</span> </h2>
      
        <ul>
        { 
          data.length > 0 && !loading ? 
            
          data.map( photo => <Photo photo={photo} key={photo.id} />) : 
            
          <NotFound /> 
        }
        </ul>
      
      </div>
    )
}

