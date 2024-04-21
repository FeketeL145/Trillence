import "mdb-ui-kit/css/mdb.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AllSongs from "../Components/AllSongs";

import FooterMusicPlayer from "../Components/MusicPlayer/FooterMusicPlayer";
function HomePage() {
  return(
  <div className="w-100 h-100 hiddenscrollbar">
    <h1>Random zenék</h1>
    <AllSongs />




    <div className="musicPlayer">
      <FooterMusicPlayer />
    </div>
    
  </div>
  )
  
}

export default HomePage;