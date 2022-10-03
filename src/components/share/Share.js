import "./share.css";
import { PermMedia, EmojiEmotions } from "@mui/icons-material";

export default function share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop"></div>
        <img className="shareProfileImg" src="/assets/people/1.jpg" alt="" />
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
        <button className="shareButton">
            Share
        </button>
        </div>
      </div>
    </div>
  );
}
