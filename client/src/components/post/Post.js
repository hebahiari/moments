import "./post.css";
import { MoreVert, Favorite, ChatBubbleOutline } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { getUserById, likeDislikePost, sendComment } from "../../utils/api";
import { format } from "timeago.js";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { BasicPopover } from "../popover/BasicPopover";

export default function Post({ post }) {
  const [user, setUser] = useState({});
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

  //ADD: actual like
  const likeHandler = () => {
    try {
      likeDislikePost(post._id, currentUser._id).then(() => setLiked(!liked));
    } catch (error) {
      console.log(error);
    }
  };

  const commentHandler = () => {
    setAddComment(!addComment);
  };

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
        <img
          //TODO: fix image
          src={`${post.img}`}
          className="postImg"
          alt=""
        />
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
            {/* {post.comments.length}  */}
            view comments
          </span>
        </div>
      </div>
      {addComment ? addCommentSection : null}
    </div>
  );
}
