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
import App from '../App';
import AudioPlayer from '../Components/MusicPlayer/AudioPlayer';
function Featuretester() {

    const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Nincs kiválasztott fájl!");
      return;
    }

    // Ellenőrizze, hogy a kiválasztott fájl .mp3 kiterjesztésű-e
    if (!file.name.toLowerCase().endsWith('.mp3')) {
      alert("Csak .mp3 fájlok engedélyezettek!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/FileUploadApi/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.Message);
      } else {
        const errorResult = await response.json();
        alert(`Hiba: ${errorResult.Message}`);
      }
    } catch (error) {
      console.error('Hiba történt a kérés során:', error);
    }
  };
    return (
        <div className='container p-4 mt-4 bg-dark rounded-8' >
        <form asp-action="Upload" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="file">Válassz .mp3 fájlt:</label>
                <input type="file" name="file" id="file" className="m-2 form-control rounded-8 bg-dark" accept=".mp3" required />
            </div>
            <button type="submit" class="btn btn-primary">Feltöltés</button>
        </form>
        </div>
    )
}
export default Featuretester;