import "./userIcon.css";
import { Link } from "react-router-dom";

export default function UserIcon({ person }) {
  return (
    <Link
      className="user"
      to={`/profile/${person.username}`}
      style={{ textDecoration: "none" }}
    >
      <img src={person.profilePicture} alt="" className="userImg" />
      <span className="userName">{person.username}</span>
    </Link>
  );
}
