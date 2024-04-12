import "bootstrap-icons/font/bootstrap-icons.css";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import SearchBar from "../Components/Search";

function SearchPage() {
  return (
    <div>
      <div>
        <SearchBar />
      </div>
    </div>
  );
}

export default SearchPage;
