import "./comment.css";
import { Link, useHistory } from "react-router-dom";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { getUserById } from "../../utils/api";
import LoadingBar from "../loadingBar/LoadingBar";

export default function Comments(comment) {
  const history = useHistory;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

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

  //display the comment
  if (loading) {
    return <LoadingBar />;
  }

  return (
    <>
      <div className="postTopLeft" style={{ margin: "10px 0" }}>
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
        {/* <span className="postDate">{format(comment.createdAt)}</span> */}
      </div>
      <div className="postTopRight"></div>
    </>
  );
}
