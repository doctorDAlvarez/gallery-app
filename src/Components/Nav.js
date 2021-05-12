import React from 'react';
import { NavLink } from "react-router-dom";

export default function Nav() {
    return (              
      <nav className="main-nav">
         <ul>
           <li><NavLink to="/planes">Planes</NavLink></li>
           <li><NavLink to="/cars">Cars</NavLink></li>
           <li><NavLink to="/boats">Boats</NavLink></li>
        </ul>
     </nav>
     
    );
}

