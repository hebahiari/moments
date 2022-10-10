import { Search } from "@mui/icons-material";
import TopBar from "../../components/topbar/TopBar";
import "./searchUsername.css";

export default function SearchUsername() {
  return (
    <div>
      <TopBar />
      <div className="searchBar">
        <Search className="icon" />
        <input
          type="text"
          placeholder="Search Moments"
          className="searchInput"
        />
      </div>
    </div>
  );
}
