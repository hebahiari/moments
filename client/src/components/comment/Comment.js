import "./comment.css";
import { Link, useHistory } from "react-router-dom";
import { format } from "timeago.js";
import { useContext, useEffect, useState } from "react";
import { deleteComment, getUserById } from "../../utils/api";
import LoadingBar from "../loadingBar/LoadingBar";
import { Close } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";

export default function Comments(comment) {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useContext(AuthContext);

  //fetch the profile of the user that posted the comment
  useEffect(() => {
    const abortController = new AbortController();

    setLoading(true);
    getUserById(comment.comment.userId, abortController.signal).then(
      (response) => {
        setUser(response.data);
        setLoading(false);
      }
    );

    return () => abortController.abort();
  }, [comment.userId]);

  const handleDelete = () => {
    if (window.confirm("Delete comment?")) {
      deleteComment(comment.comment._id, currentUser._id).then(history.go());
    }
  };

  //display the comment
  if (loading) {
    return <LoadingBar />;
  }

  return (
    <>
      <div className="comment">
        <div className="commentBody">
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
            <span className="postUsername">{user.username}:</span>
          </Link>
          <div className="postCommentText">{comment.comment.desc}</div>
        </div>
        <div className="commentDelete"></div>
        {/* // only show delete button for the same user */}
        {user.username === currentUser.username ? (
          <Close
            style={{ cursor: "pointer", fontSize: "15px", color: "grey" }}
            onClick={handleDelete}
          />
        ) : null}
      </div>
      <div className="postTopRight"></div>
    </>
  );
}
