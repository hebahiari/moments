import "./share.css";
import { PermMedia, EmojiEmotions, Cancel } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { sharePost, uploadImage } from "../../utils/api";
import { useHistory } from "react-router-dom";

export default function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    // if the new posts includes a file when submitting
    if (file) {
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);
      newPost.img = file.location;
      try {
        uploadImage(data)
          .then((response) => {
            newPost.img = response.data;
          })
          .then(() => sharePost(newPost).then(history.go()));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        sharePost(newPost).then(history.go());
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <form className="shareForm" onSubmit={handleSubmit}>
          <div className="shareTop">
            <img className="shareProfileImg" src={user.profilePicture} alt="" />
            <input
              placeholder={`What would you like to share today, ${user.username}?`}
              type="text"
              className="shareInput"
              required
              ref={desc}
            />
          </div>
          <hr className="shareHr" />
          {file ? (
            <div className="shareImgContainer">
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="shareImg"
              />
              <Cancel className="shareDiscard" onClick={() => setFile(null)} />
            </div>
          ) : null}
          <div className="shareBottom">
            <label htmlFor="file" className="shareOption">
              <PermMedia className="shareIcon" />
              <span className="shareOptionText">Media</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpg,.jpeg"
                onChange={(event) => setFile(event.target.files[0])}
              ></input>
            </label>
            <button className="shareButton" type="submit">
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
