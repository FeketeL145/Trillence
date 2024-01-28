import {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";

function HomePage() {
  return (
    <div className="p-4 m-auto text-center content bg-ivory">
      <div className="card col-sm-3 d-inline-block ms-4" style={{
        borderRadius: '20px',
        backgroundColor: '#0A2234',
        color: 'white'
      }}>
        <div className="card-body">
          <img src="song image" alt="song image" style={{
            maxWidth: '100%',
            maxHeight: '50%',
            objectFit: 'cover',
            alignSelf: 'center',
            borderRadius: '10px'
          }}/>
          <h2 style={{ textAlign: 'center', fontWeight: 'bold'}}>Song title</h2>
          <p style={{ textAlign: 'center', fontSize: '20px'}}>Author</p>
          <p style={{ textAlign: 'center', fontSize:'25px' }} className='postcontent mt-3'>song uhh</p>
          <p style={{ textAlign: 'center', fontSize:'18px'}}>Photo by: uhh</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
