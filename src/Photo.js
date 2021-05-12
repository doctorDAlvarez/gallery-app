import React from 'react';

export default function Photo(props) {
    return (
        <li>
            <img src={`https://live.staticflickr.com/${props.photo.server}/${props.photo.id}_${props.photo.secret}_w.jpg`} alt={`${props.photo.title}`} />
        </li>
    );
}


