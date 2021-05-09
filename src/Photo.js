import React from 'react';
import NotFound from './NotFound';

function Photo(props) {
    return (
        <div class="photo-container">
            <h2>Results</h2>
                <ul>
                { props.images.map( image => {
                    return (
                        <li>
                            <img src="" alt="" />
                        </li>
                    )
                    })}
                </ul>
            <NotFound />
        </div>
    );
}

export default Photo;
