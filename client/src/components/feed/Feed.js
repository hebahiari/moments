import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { getFollowingPosts, getUserPosts } from "../../utils/api";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  //fetch posts
  useEffect(() => {
    if (username) {
      getUserPosts(username).then((response) => setPosts(response.data));
    } else {
      getFollowingPosts().then((response) => setPosts(response.data));
    }
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
