import NoPosts from "../../components/noPosts/NoPosts";
import TopBar from "../../components/topbar/TopBar";
import "./notFound.css";

export default function () {
  return (
    <div>
      <TopBar />
      <div className="notFoundWrapper">
        <NoPosts message={"Page Not Found"} />
      </div>
    </div>
  );
}
