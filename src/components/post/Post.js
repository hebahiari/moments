import "./post.css";
import { MoreVert, Favorite } from "@mui/icons-material";

export default function Post() {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src="/assets/people/1.jpg" className="postProfileImg" alt="" />
            <span className="postUsername">Heba A</span>
            <span className="postDate">5 minutes ago</span>
          </div>
          <div className="postTopRight">
            <MoreVert className="" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">Hellooooo</span>
          <img src="assets/posts/1.jpg" className="postImg" alt="" />
        </div>
        <div className="postBottom">
            <div className="postBottomLeft">
                <Favorite className="likeIcon"/>
                <span className="postLikeCounter">
                    33 people like it
                </span>
            </div>
            <div className="postBottomRight">
                <span className="postCommentText"> 9 Comments</span>
            </div>
        </div>
      </div>
    </div>
  );
}
