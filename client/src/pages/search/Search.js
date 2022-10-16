import { Search as SearchIcon } from "@mui/icons-material";
import TopBar from "../../components/topbar/TopBar";
import "./search.css";
import useQuery from "../../utils/useQuery";
import { useEffect, useRef, useState } from "react";
import { findMatchingUsernames } from "../../utils/api";
import NoPosts from "../../components/noPosts/NoPosts";
import UserIcon from "../../components/userIcon/UserIcon";
import { useHistory } from "react-router-dom";

export default function Search() {
  // getting the searched username
  let username = null;
  const [found, setFound] = useState([]);
  const history = useHistory();
  const searchUsername = useRef();
  const [loading, setLoading] = useState(false);

  const query = useQuery();
  if (query.get("username")) {
    username = query.get("username");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/search?username=${searchUsername.current.value}`);
  };

  useEffect(() => {
    const abortController = new AbortController();
    try {
      setLoading(true);
      findMatchingUsernames(username, abortController.signal).then(
        (response) => {
          setFound(response.data);
          setLoading(false);
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    return () => abortController.abort();
  }, [username]);

  if (loading) {
    return null;
  }

  return (
    <div>
      <TopBar />
      <div className="searchWrapper">
        <div className="searchBarFull">
          <SearchIcon className="icon" />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search Usernames"
              className="searchInput"
              ref={searchUsername}
              required
            />
          </form>
        </div>

        {username && found.length === 0 ? (
          <NoPosts message={`no results found for "${username}"`} />
        ) : (
          <div className="searchResults">
            {found.map((person) => (
              <UserIcon person={person} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
