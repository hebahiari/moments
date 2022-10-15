import "./comment.css";
import { Link, useHistory } from "react-router-dom";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { getUserById } from "../../utils/api";

export default function Comments(comment) {
  const history = useHistory;
  const [user, setUser] = useState({});
  console.log(comment.comment);

  //fetch the profile of the user that posted the comment
  useEffect(() => {
    const abortController = new AbortController();

    getUserById(comment.comment.userId, abortController.signal).then(
      (response) => setUser(response.data)
    );

    return () => abortController.abort();
  }, [comment.userId]);

  //display the comment
  return (
    <>
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
          <span className="postUsername">{user.username}:</span>
        </Link>
        <div className="postText">{comment.comment.desc}</div>
        {/* <span className="postDate">{format(comment.createdAt)}</span> */}
      </div>
      <div className="postTopRight"></div>
    </>
  );
}
