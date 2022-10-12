import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";
import "./home.css";

export default function Home() {
  return (
    <>
      <div className="home">
        <TopBar />
        <Feed />
      </div>
    </>
  );
}
