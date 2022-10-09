import "./profile.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import ProfileFeed from "../../components/profileFeed/ProfileFeed";
import { useEffect, useState } from "react";
import { getUserByUsername } from "../../utils/api";
import { useParams } from "react-router";
import ProfileInfo from "../../components/profileInfo/ProfileInfo";

export default function Profile() {
  const [user, setUser] = useState({});
  const { username } = useParams();

  // get user
  useEffect(() => {
    const abortController = new AbortController();

    try {
      getUserByUsername(username).then((response) => setUser(response.data));
    } catch (error) {
      if (error.name === "AbortError") {
        // Ignore `AbortError`
        console.log("Aborted");
      } else {
        throw error;
      }
    }
    return () => abortController.abort();
  }, [username]);

  return (
    <>
      <TopBar />
      <div className="profile">
        <div className="profileTop">
          <div className="profileCover">
            <img src={user.coverPhoto} className="profileCoverImg" alt="" />
            <img src={user.profilePicture} className="profilePicture" alt="" />
          </div>
          <div>
            <h4 className="profileInfoName">{user.username}</h4>
            <span className="profileInfoDesc">{user.desc}</span>
          </div>
        </div>
        <div className="profileBottom">
          <div className="profileBottomFeed">
            <ProfileFeed username={username} />
          </div>
          <div className="profileBottomInfo">
            <ProfileInfo user={user} className="profileBottomInfo" />
          </div>
        </div>
      </div>
    </>
  );
}
