import "./share.css";
import { PermMedia, EmojiEmotions, CheckCircle } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { sharePost, uploadImage } from "../../utils/api";

export default function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = "" + user._id + Date.now() + file.name;
      data.append("file", file);
      data.append("name", fileName);
      let options = {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };
      newPost.img = fileName;
      try {
        uploadImage(options);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      sharePost(newPost);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop"></div>
        <img className="shareProfileImg" src={user.profilePicture} alt="" />
        <input
          placeholder={`What would you like to share today, ${user.username}?`}
          type="text"
          className="shareInput"
          ref={desc}
        />
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              {file ? <CheckCircle style={{ color: "green" }} /> : null}
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
            <div className="shareOption">
              <EmojiEmotions className="shareIcon" />
              <span className="shareOptionText">Feeling</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
