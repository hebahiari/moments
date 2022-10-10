import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { getFollowingPosts, getUserPosts, getAllPosts } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

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
      getFollowingPosts(user._id).then((response) =>
        setFollowingPosts(
          response.data.sort((postA, postB) => {
            return new Date(postB.createdAt) - new Date(postA.createdAt);
          })
        )
      );
      getAllPosts().then((response) =>
        setPosts(
          response.data.sort((postA, postB) => {
            return new Date(postB.createdAt) - new Date(postA.createdAt);
          })
        )
      );
    }
  }, [username, user._id]);

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
          <Link
            onClick={() => setShowAllPosts(true)}
            style={{ textDecoration: "none" }}
            className={showAllPosts ? "feedOptionsOrange" : "feedOptionsGrey"}
          >
            Around the World
          </Link>
          <span> | </span>
          <Link
            onClick={() => setShowAllPosts(false)}
            style={{ textDecoration: "none" }}
            className={!showAllPosts ? "feedOptionsOrange" : "feedOptionsGrey"}
          >
            Following
          </Link>
        </div>
        <div className="feedPosts">
          {showAllPosts
            ? posts.map((post) => <Post key={post._id} post={post} />)
            : followingPosts.map((post) => <Post key={post._id} post={post} />)}
        </div>
      </div>
    </div>
  );
}
