import { Search as SearchIcon } from "@mui/icons-material";
import TopBar from "../../components/topbar/TopBar";
import "./search.css";
import useQuery from "../../utils/useQuery";
import { useEffect, useState } from "react";
import { findMatchingUsernames } from "../../utils/api";
import NoPosts from "../../components/noPosts/NoPosts";
import UserIcon from "../../components/userIcon/UserIcon";

export default function Search() {
  // getting the searched username
  let username;
  const [found, setFound] = useState([]);

  const query = useQuery();
  if (query.get("username")) {
    username = query.get("username");
  }

  useEffect(() => {
    try {
      findMatchingUsernames(username).then((response) =>
        setFound(response.data)
      );
    } catch (error) {
      console.log(error);
    }
  }, [username]);

  return (
    <div>
      <TopBar />
      <div className="searchWrapper">
        <div className="searchBarFull">
          <SearchIcon className="icon" />
          <input
            type="text"
            placeholder="Search Moments"
            className="searchInput"
          />
        </div>
        <div className="searchResults">
          {found.length == 0 ? (
            <NoPosts message={"no results found"} />
          ) : (
            found.map((person) => <UserIcon person={person} />)
          )}
        </div>
      </div>
    </div>
  );
}
