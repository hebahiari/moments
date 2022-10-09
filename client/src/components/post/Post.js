import "./post.css";
import { MoreVert, Favorite } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { getUserById, likeDislikePost } from "../../utils/api";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function Post({ post }) {
  const [user, setUser] = useState({});
  const [addComment, setAddComment] = useState(false);
  const currentUser = useContext(AuthContext).user;
  const history = useHistory();
  const isLiked = post.likes.includes(currentUser._id);
  const comment = useRef();

  //fetch users
  useEffect(() => {
    getUserById(post.userId).then((response) => setUser(response.data));
  }, [post.userId]);

  //ADD: actual like
  const likeHandler = () => {
    console.log(currentUser);
    try {
      likeDislikePost(post._id, currentUser._id).then(history.go());
    } catch (error) {
      console.log(error);
    }
  };

  const commentHandler = () => {
    setAddComment(!addComment);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //TODO: add comment
  };

  //TODO: show delete option
  const optionsHandler = () => {};

  const addCommentSection = (
    <>
      <hr className="shareHr" />
      {/* TODO: display comments       */}
      <form className="commentInputForm" onSubmit={handleSubmit}>
        <input
          placeholder="Write your comment..."
          type="text"
          className="commentInput"
          ref={comment}
        />
        <button className="shareButton" type="submit">
          Post
        </button>
      </form>
    </>
  );

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={`profile/${user.username}`}
              style={{ textDecoration: "none" }}
            >
              <img
                src={user.profilePicture}
                className="postProfileImg"
                alt=""
              />
            </Link>
            <Link
              to={`profile/${user.username}`}
              style={{ textDecoration: "none" }}
            >
              <span className="postUsername">{user.username}</span>
            </Link>{" "}
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert className="" onClick={optionsHandler} />
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
            {isLiked ? (
              <Favorite
                className="likeIcon"
                onClick={likeHandler}
                style={{ color: "red" }}
              />
            ) : (
              <Favorite
                className="likeIcon"
                onClick={likeHandler}
                style={{ color: "#303030" }}
              />
            )}
            <span className="postLikeCounter">
              {post.likes.length === 0 ? null : post.likes.length}
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={commentHandler}>
              {post.comments.length} Comments
            </span>
          </div>
        </div>
        {addComment ? addCommentSection : null}
      </div>
    </div>
  );
}
