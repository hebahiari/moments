import "./post.css";
import { Favorite } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { getUserById, likeDislikePost, sendComment } from "../../utils/api";
import { format } from "timeago.js";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { BasicPopover } from "../popover/BasicPopover";

export default function Post({ post }) {
  const [user, setUser] = useState({});
  // only show add comment section initally if its the single post page
  const [addComment, setAddComment] = useState(
    useParams().postId ? true : false
  );

  const currentUser = useContext(AuthContext).user;
  const history = useHistory();
  const isLiked = post.likes.includes(currentUser._id);
  const comment = useRef();
  const [liked, setLiked] = useState(isLiked);

  //fetch users
  useEffect(() => {
    getUserById(post.userId).then((response) => setUser(response.data));
  }, [post.userId]);

  const likeHandler = () => {
    try {
      //api checks if its liked or not and does the opposite
      likeDislikePost(post._id, currentUser._id).then(() => setLiked(!liked));
    } catch (error) {
      console.log(error);
    }
  };

  // displays/hides the add comment section when comment icon is pressed
  const commentHandler = () => {
    setAddComment(!addComment);
  };

  //submit new comment
  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      userId: currentUser._id,
      postId: post._id,
      desc: comment.current.value,
    };
    try {
      sendComment(newComment).then(history.go());
    } catch (error) {
      console.log(error);
    }
  };

  const addCommentSection = (
    <>
      <hr className="commentHr" />
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
      <div className="postTop">
        <div className="postTopLeft">
          <Link
            to={`/profile/${user.username}`}
            style={{ textDecoration: "none" }}
          >
            <img src={user.profilePicture} className="postProfileImg" alt="" />
          </Link>
          <Link
            to={`/profile/${user.username}`}
            style={{ textDecoration: "none" }}
          >
            <span className="postUsername">{user.username}</span>
          </Link>{" "}
          <span
            className="postDate"
            onClick={() => history.push(`/posts/${post._id}`)}
          >
            {format(post.createdAt)}
          </span>
        </div>
        <div className="postTopRight">
          <BasicPopover postId={post._id} userId={post.userId} />
        </div>
      </div>
      <div className="postCenter">
        <span className="postText">{post?.desc}</span>
        <img src={`${post.img}`} className="postImg" alt="" />
      </div>
      <div className="postBottom">
        <div className="postBottomLeft">
          {liked ? (
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
          {/* add number of likes? */}
          {/* <span className="postLikeCounter">
              {post.likes.length === 0 ? null : post.likes.length}
            </span> */}
          <img
            src="https://petsgram-app.s3.us-west-1.amazonaws.com/chat-6820229_1280.png"
            className="commentIcon"
            onClick={commentHandler}
          />
        </div>
        <div className="postBottomRight">
          <span
            className="postCommentText"
            onClick={() => history.push(`/posts/${post._id}`)}
          >
            {/* TODO: add number of comments */}
            {/* {post.comments.length}  */}
            view comments
          </span>
        </div>
      </div>
      {addComment ? addCommentSection : null}
    </div>
  );
}
