import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./profileFeed.css";
import { getFollowingPosts, getUserPosts } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import NoPosts from "../noPosts/NoPosts";

export default function ProfileFeed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  //fetch posts
  useEffect(() => {
    if (username) {
      getUserPosts(username).then((response) => setPosts(response.data));
    } else {
      getFollowingPosts(user._id).then((response) =>
        setPosts(
          response.data.sort((postA, postB) => {
            return new Date(postB.createdAt) - new Date(postA.createdAt);
          })
        )
      );
    }
  }, [username, user._id]);

  return (
    <div className="profileFeed">
      <div className="profileFeedShare">
        {!username || username === user.username ? <Share /> : null}
      </div>
      {/* <hr className="profileFeedHr" /> */}
      {posts.length === 0 ? <NoPosts message={"no posts yet!"} /> : null}
      <div className="profileFeedPosts">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
