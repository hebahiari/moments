import "./share.css";
import { PermMedia, EmojiEmotions } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Share() {
  const { user } = useContext(AuthContext);

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop"></div>
        <img className="shareProfileImg" src={user.profilePicture} alt="" />
        <input
          placeholder="What do you want to share today?"
          type="text"
          className="shareInput"
        />
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia className="shareIcon" />
              <span className="shareOptionText">Media</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions className="shareIcon" />
              <span className="shareOptionText">Feeling</span>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}
