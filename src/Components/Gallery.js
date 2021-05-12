import React from 'react';
import { useEffect} from 'react';
import { useParams} from 'react-router-dom';
import NotFound from './NotFound';
import Photo from './Photo';

export default function Gallery(props) {
    
    let {query} = useParams();    
    
    useEffect(() => {
        if (props.query) {
          props.handleSearch(query)
        }     
    });
    
    return (
        <div className="photo-container">
           { props.data.length === 0 ? null : <h2>Images of :  {props.query || props.title}</h2> }
           <ul>
                {props.data.length === 0 ?
                <NotFound /> :
                 props.data.map( photo => <Photo photo={photo} key={photo.id} />)
                }
           </ul>
        </div>
    );
}


