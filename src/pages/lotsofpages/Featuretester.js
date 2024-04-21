import { useEffect, useState } from 'react';
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
import App from '../../App';


import SongDeleteById from './Songs/SongDeleteById';
import SongList from './Songs/SongList2';
import SongPost from './Songs/SongPost';
import SongSinglePage from './Songs/SongSinglePage';
import SongUpdatebyId from './Songs/SongUpdatebyId';
import FooterMusicPlayer from '../../Components/MusicPlayer/FooterMusicPlayer';
import AllPlaylist from '../../Components/Playlist/AllPlaylist';

function Featuretester() {
    return (
        <div>
            <AllPlaylist />
        </div>
    )
}
export default Featuretester;