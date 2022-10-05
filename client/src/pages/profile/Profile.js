import "./profile.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
  return (
    <>
      <TopBar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">

                 <img src="assets/posts/1.jpg" className="profileCoverImg" alt="" />
            <img src="assets/people/1.jpg" className="profilePicture" alt="" />
            </div>
           <div className="profileInfo">
            <h4 className="profileInfoName">
my name
            </h4>
            <span className="profileInfoDesc">
hello my friends
            </span>
           </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
}
