import React from 'react';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

function Nav(props) {
    return (      
            <Router>
                <nav className="main-nav">
                    <ul>
                        <li><Link to='/dogs'>Cats</Link></li>
                        <li><Link to='/cats'>Dogs</Link></li>
                        <li><Link to='/computers'>Computers</Link></li>
                    </ul>
                </nav>
            </Router>
    );
}

export default Nav;