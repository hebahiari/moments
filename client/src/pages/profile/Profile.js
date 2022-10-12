import "./profile.css";
import TopBar from "../../components/topbar/TopBar";
import ProfileFeed from "../../components/profileFeed/ProfileFeed";
import { useContext, useEffect, useState } from "react";
import {
  getUserByUsername,
  uploadImage,
  updateProfilePicture,
} from "../../utils/api";
import { useParams } from "react-router";
import ProfileInfo from "../../components/profileInfo/ProfileInfo";
import { Edit } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({});
  const { username } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [file, setFile] = useState("");
  const history = useHistory();

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

  useEffect(() => {
    // when an img is uploaded, change the profile photo
    if (file) {
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);
      try {
        uploadImage(data).then((response) =>
          updateProfilePicture(response.data, currentUser._id).then(
            history.go()
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
  }, [file]);

  //TODO add cover photo
  const handleEditCoverPhoto = () => {};

  return (
    <>
      <TopBar />
      <div className="profile">
        <div className="profileTop">
          <div className="profileCover">
            <img src={user.coverPhoto} className="profileCoverImg" alt="" />
            {/* TODO: ability to edit cover photo */}
            {/* {currentUser.username === username ? (
              <div
                className="coverPhotoEditButton"
                onClick={handleEditCoverPhoto}
              >
                <Edit />
              </div>
            ) : null} */}
            <img src={user.profilePicture} className="profilePicture" alt="" />
            {currentUser.username === username ? (
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
