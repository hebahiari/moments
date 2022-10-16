import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";
import "./home.css";
import Share from "../../components/share/Share";
import { useState } from "react";

export default function Home() {
  const [showAllPosts, setShowAllPosts] = useState(true);

  return (
    <>
      <div className="home">
        <div className="feed">
          <div className="feedWrapper">
            <div className="feedShareWrapper">
              <div className="feedShare">
                <Share />
              </div>
            </div>
            <div className="feedOptions">
              <span
                onClick={() => setShowAllPosts(true)}
                style={{ textDecoration: "none" }}
                className={
                  showAllPosts ? "feedOptionsOrange" : "feedOptionsGrey"
                }
              >
                Around the World
              </span>
              <span> | </span>
              <span
                onClick={() => setShowAllPosts(false)}
                style={{ textDecoration: "none" }}
                className={
                  !showAllPosts ? "feedOptionsOrange" : "feedOptionsGrey"
                }
              >
                Following
              </span>
            </div>
            <Feed showAllPosts={showAllPosts} />
          </div>
        </div>
      </div>
    </>
  );
}
