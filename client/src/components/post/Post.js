import "./post.css";
import { CommentTwoTone, Favorite } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import {
  getPostComments,
  getUserById,
  likeDislikePost,
  sendComment,
} from "../../utils/api";
import { format } from "timeago.js";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { PostPopover } from "../popover/PostPopover";
import LoadingBar from "../loadingBar/LoadingBar";

export default function Post({ post }) {
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  const [likeError, setLikeError] = useState(false);

  // only show add comment section initally if its the single post page
  const [addComment, setAddComment] = useState(
    useParams().postId ? true : false
  );

  const currentUser = useContext(AuthContext).user;
  const history = useHistory();
  const isLiked = post.likes.includes(currentUser?._id);
  const comment = useRef();
  const [liked, setLiked] = useState(isLiked);
  const [loading, setLoading] = useState(true);

  //fetch the user that made the post
  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    getUserById(post.userId, abortController.signal).then((response) => {
      setUser(response.data);
      setLoading(false);
    });
    return () => abortController.abort();
  }, [post?.userId]);

  //fetch comments on the post
  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);

    getPostComments(post._id, abortController.signal).then((response) => {
      setComments(response.data);
      setLoading(false);
    });
    return () => abortController.abort();
  }, [post?._id]);

  const likeHandler = () => {
    if (currentUser.username !== "guest-user") {
      try {
        //api checks if its liked or not and does the opposite
        likeDislikePost(post._id, currentUser?._id).then(() =>
          setLiked(!liked)
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      setLikeError(true);
    }
  };

  // displays/hides the add comment section when comment icon is pressed
  const commentHandler = () => {
    setAddComment(!addComment);
  };

  //submit new comment
  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentUser.username !== "guest-user") {
      const newComment = {
        userId: currentUser?._id,
        postId: post._id,
        desc: comment.current.value,
      };
      sendComment(newComment)
        .then(() => history.go())
        .catch((error) => setError("Comment cannot be empty"));
    } else {
      setError("Please sign up to use this feature");
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
          required
        />
        <button className="shareButton" type="submit">
          Post
        </button>
      </form>
    </>
  );

  if (loading) {
    return <LoadingBar />;
  }

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
          <PostPopover postId={post._id} userId={post.userId} />
        </div>
      </div>
      <div className="postCenter">
        <span className="postText">{post?.desc}</span>
        <img
          src={`${post.img}`}
          className="postImg"
          alt=""
          onClick={() => history.push(`/posts/${post._id}`)}
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
            {comments.length} comments
          </span>
        </div>
      </div>
      {likeError ? (
        <div className="commentError">Please sign up to use this feature</div>
      ) : null}
      {addComment ? addCommentSection : null}
      {error ? <div className="commentError">{error}</div> : null}
    </div>
  );
}
