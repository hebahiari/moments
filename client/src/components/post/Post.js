import "./post.css";
import { MoreVert, Favorite } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getUserById } from "../../utils/api";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  //fetch users
  useEffect(() => {
    getUserById(post.userId).then((response) => setUser(response.data));
  }, [post.userId]);

  //ADD: actual like
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={user.profilePicture}
                className="postProfileImg"
                alt=""
              />
              <span className="postUsername">{user.username}</span>
            </Link>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert className="" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={post.img} className="postImg" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <Favorite className="likeIcon" onClick={likeHandler} />
            <span className="postLikeCounter">
              {post.likes.length === 1
                ? "1 Like"
                : post.likes.length + " Likes"}{" "}
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText"> {post.comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
