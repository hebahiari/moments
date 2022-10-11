import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { getFollowingPosts, getUserPosts, getAllPosts } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import NoPosts from "../noPosts/NoPosts";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [showAllPosts, setShowAllPosts] = useState(true);
  const { user } = useContext(AuthContext);

  //fetch posts
  useEffect(() => {
    if (username) {
      getUserPosts(username).then((response) => setPosts(response.data));
    } else {
      if (showAllPosts) {
        getAllPosts().then((response) =>
          setPosts(
            response.data
              .sort((postA, postB) => {
                return new Date(postB.createdAt) - new Date(postA.createdAt);
              })
              .slice(0, 50)
          )
        );
      } else {
        getFollowingPosts(user._id).then((response) =>
          setFollowingPosts(
            response.data
              .sort((postA, postB) => {
                return new Date(postB.createdAt) - new Date(postA.createdAt);
              })
              .slice(0, 50)
          )
        );
      }
    }
  }, [username, user._id, showAllPosts]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <div className="feedShareWrapper">
          <div className="feedShare">
            {!username || username === user.username ? <Share /> : null}
          </div>
        </div>
        {/* <hr className="feedHr" /> */}
        <div className="feedOptions">
          <span
            onClick={() => setShowAllPosts(true)}
            style={{ textDecoration: "none" }}
            className={showAllPosts ? "feedOptionsOrange" : "feedOptionsGrey"}
          >
            Around the World
          </span>
          <span> | </span>
          <span
            onClick={() => setShowAllPosts(false)}
            style={{ textDecoration: "none" }}
            className={!showAllPosts ? "feedOptionsOrange" : "feedOptionsGrey"}
          >
            Following
          </span>
        </div>
        <div className="feedPosts">
          {showAllPosts
            ? posts.map((post) => <Post key={post._id} post={post} />)
            : followingPosts.map((post) => <Post key={post._id} post={post} />)}
        </div>
        <div className="feedNoPosts">
          {followingPosts.length === 0 && !showAllPosts ? (
            <NoPosts message={"no posts here!"} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
