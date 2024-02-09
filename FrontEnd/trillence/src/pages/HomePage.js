import {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import "mdb-ui-kit/css/mdb.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";

function HomePage() {
  
  return (
    <div>
      <div className='container p-4 mt-4 bg-dark rounded-8' >
        <div className='input-group'>
          <div className='form-outline' data-mdb-input-init>
            <input type='search' id='form1' className='form-control' />
            <label className='form-label' htmlFor='form1'>
              Search
            </label>
          </div>
          <button type="button" className='btn btn-primary' data-mdb-ripple-init>
            <i class='bi bi-search'></i>
          </button>
        </div>
      </div>
      <div className='container p-4 mt-4 bg-dark rounded-8'>
        <div className="row">
          <div className=''>
            <div className="card">
              <NavLink to={`/musicpage/CurrentSongId`}>
            <div className="songimgcontainer">
                  <div className='songimggroup songimg'><img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp" alt="Song Thumbnail" className='w-100'/></div>
                  <div className='songimggroup songimgoverlay'></div>
                </div>
              <div className="card-body">
                <h5 className="card-title">Song Title</h5>
                <p className="card-text">Song artist</p>
              </div>
              </NavLink>
            </div>
          </div>
        </div>
    </div>
  </div>
  );
}

export default HomePage;