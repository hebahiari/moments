import "./post.css";
import { MoreVert, Favorite } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { getUserById, likeDislikePost } from "../../utils/api";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const currentUser = useContext(AuthContext).user;
  const history = useHistory();

  //TODO: change heart color to red when post is liked

  //fetch users
  useEffect(() => {
    getUserById(post.userId).then((response) => setUser(response.data));
  }, [post.userId]);

  //ADD: actual like
  const likeHandler = () => {
    console.log(currentUser);
    try {
      likeDislikePost(post._id, currentUser._id).then(history.go());
      console.log("liked!");
    } catch (error) {}
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
          <img
            //TODO: fix image
            src={`${post.img}`}
            className="postImg"
            alt=""
          />
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
