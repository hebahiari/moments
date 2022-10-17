import { Link } from "react-router-dom";
import "./petIcon.css";

export default function PetIcon({ pet }) {
  return (
    <Link
      className="user"
      to={`/profile/${pet.username}/${pet.name}`}
      style={{ textDecoration: "none" }}
    >
      <img src={pet.img} alt="" className="userImg" />
      <span className="userName">{pet.name}</span>
    </Link>
  );
}
