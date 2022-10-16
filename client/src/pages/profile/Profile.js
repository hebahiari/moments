import "./profile.css";
import TopBar from "../../components/topbar/TopBar";
import ProfileFeed from "../../components/profileFeed/ProfileFeed";
import { useContext, useEffect, useState } from "react";
import {
  getUserByUsername,
  uploadImage,
  updateProfilePicture,
  updateCoverPhoto,
} from "../../utils/api";
import { useParams } from "react-router";
import ProfileInfo from "../../components/profileInfo/ProfileInfo";
import { Edit } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import LoadingBar from "../../components/loadingBar/LoadingBar";

export default function Profile() {
  const [user, setUser] = useState({});
  const { username } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  // get user
  useEffect(() => {
    const abortController = new AbortController();

    try {
      setLoading(true);
      getUserByUsername(username, abortController.signal).then((response) => {
        setUser(response.data);
        setLoading(false);
      });
    } catch (error) {
      if (error.name === "AbortError") {
        setLoading(false);
        // Ignore `AbortError`
        console.log("Aborted");
      } else {
        throw error;
      }
    }
    return () => abortController.abort();
  }, [username]);

  useEffect(() => {
    // when an img is uploaded, change the profile photo
    const abortController = new AbortController();

    if (file) {
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);
      try {
        uploadImage(data, abortController.signal).then((response) =>
          updateProfilePicture(
            response.data,
            currentUser._id,
            abortController.signal
          )
            .then(history.go())
            .catch((error) => console.log(error))
        );
      } catch (error) {
        console.log(error);
      }
    }

    return () => abortController.abort();
  }, [file]);

  useEffect(() => {
    // when an cover photo is uploaded, change the profile photo
    const abortController = new AbortController();

    if (coverPhoto) {
      const data = new FormData();
      data.append("name", coverPhoto.name);
      data.append("file", coverPhoto);
      try {
        uploadImage(data, abortController.signal).then((response) =>
          updateCoverPhoto(
            response.data,
            currentUser._id,
            abortController.signal
          )
            .then(history.go())
            .catch((error) => console.log(error))
        );
      } catch (error) {
        console.log(error);
      }
    }

    return () => abortController.abort();
  }, [file]);

  if (loading) {
    return <LoadingBar />;
  }

  if (!user._id) {
    return <NotFound />;
  }

  return (
    <>
      <div className="profile">
        <div className="profileTop">
          <div className="profileCover">
            <img src={user?.coverPhoto} className="profileCoverImg" alt="" />
            {/* TODO: ability to edit cover photo */}
            {currentUser?.username === username && username !== "guest-user" ? (
              <label htmlFor="file" className="coverPhotoEditButton">
                <Edit />
                <input
                  style={{ display: "none" }}
                  type="file"
                  // id="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(event) => {
                    setCoverPhoto(event.target.files[0]);
                  }}
                ></input>
              </label>
            ) : null}
            <img src={user?.profilePicture} className="profilePicture" alt="" />
            {currentUser?.username === username && username !== "guest-user" ? (
              <label htmlFor="file" className="profilePictureEditButton">
                <Edit />
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                  }}
                ></input>
              </label>
            ) : null}
          </div>
          <div>
            <h4 className="profileInfoName">{user.username}</h4>
            <span className="profileInfoDesc">{user.desc}</span>
          </div>
        </div>
        <div className="profileBottom">
          <div className="profileBottomLeft"></div>
          <div className="profileBottomFeed">
            <ProfileFeed />
          </div>
          <div className="profileBottomInfo">
            <ProfileInfo user={user} className="profileBottomInfo" />
          </div>
        </div>
      </div>
    </>
  );
}
