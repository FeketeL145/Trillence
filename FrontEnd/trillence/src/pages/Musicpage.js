import {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import AudioPlayer from '../Components/MusicPlayer/AudioPlayer';

function HomePage() {
  return (
    <div className="text-center content bg-ivory">
      <div className="mt-5 card d-inline-block" style={{borderRadius: '20px',backgroundColor: '#0A2234',color: 'white'}}>
        <div className="card-body">
          <AudioPlayer></AudioPlayer>
        </div>
      </div>
    </div>
  );
}

export default HomePage;