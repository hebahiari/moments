import "./profileInfo.css";
import { Add, Remove } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import {
  followUser,
  getFollowingUsers,
  unfollowUser,
  getFollowersUsers,
  getUserByUsername,
  userFollowsProfile,
} from "../../utils/api";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import UserIcon from "../userIcon/UserIcon";
import AddPet from "../addPet/AddPet";
import LoadingBar from "../loadingBar/LoadingBar";

export default function ProfileInfo() {
  const [followingUsers, setFollowingUsers] = useState([]);
  const [followersUsers, setFollowersUsers] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const [user, setUser] = useState({});
  const { username } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    try {
      setLoading(true);
      getUserByUsername(username, abortController.signal).then((response) => {
        setUser(response.data);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    return () => abortController.abort();
  }, [username]);

  useEffect(() => {
    const abortController = new AbortController();
    if (user?._id) {
      setLoading(true);
      getFollowingUsers(user._id, abortController.signal).then((response) => {
        setFollowingUsers(response.data);
        setLoading(false);
      });
      getFollowersUsers(user._id, abortController.signal).then((response) => {
        setFollowersUsers(response.data);
        setLoading(false);
      });
    }
    return () => abortController.abort();
  }, [user]);

  useEffect(() => {
    const abortController = new AbortController();
    if (user?._id && currentUser?._id) {
      setLoading(true);
      userFollowsProfile(
        user._id,
        currentUser._id,
        abortController.signal
      ).then((response) => {
        setFollowed(response.data);
        setLoading(false);
      });
    }
    return () => abortController.abort();
  }, [user, currentUser]);

  const handleClick = () => {
    if (currentUser.username !== "guest-user") {
      try {
        if (followed) {
          unfollowUser(user._id, currentUser._id).then(setFollowed(false));
        } else {
          followUser(user._id, currentUser._id).then(setFollowed(true));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(true);
    }
  };

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <>
      {user?._id !== currentUser?._id && (
        <>
          <button className="profileInfoFollowButton" onClick={handleClick}>
            {followed ? (
              <Remove style={{ color: "white" }} />
            ) : (
              <Add style={{ color: "white" }} />
            )}
            {followed ? "Unfollow" : "Follow"}
          </button>
          {error ? (
            <div className="shareError">Please sign up to use this feature</div>
          ) : null}
        </>
      )}
      <h4 className="profileInfoTitle">User Information</h4>
      <div className="profileInfoSections">
        <div className="profileInfoSection">
          <span className="profileInfoInfoKey">Pets:</span>
          <span className="profileInfoInfoValue">
            {user.pets && user.pets.length
              ? user.pets.join("! ")
              : "no data yet"}
          </span>
          {user?._id === currentUser?._id && (
            <AddPet currentUser={currentUser} />
          )}
        </div>
        <div className="profileInfoSection">
          <h4 className="profileInfoInfoKey">Following:</h4>s
          <div className="profileInfoFollowings">
            {followingUsers.length ? (
              followingUsers.map((person) => {
                return <UserIcon person={person} />;
              })
            ) : (
              <span className="profileInfoInfoValue">not following anyone</span>
            )}
          </div>
        </div>
        <div className="profileInfoSection">
          <h4 className="profileInfoInfoKey">Followers:</h4>
          <div className="profileInfoFollowings">
            {followersUsers.length ? (
              followersUsers.map((person) => {
                return <UserIcon person={person} />;
              })
            ) : (
              <span className="profileInfoInfoValue">no followers</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
