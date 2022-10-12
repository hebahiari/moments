import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./profileFeed.css";
import { getUserPosts, getFollowingPosts } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import NoPosts from "../noPosts/NoPosts";

export default function ProfileFeed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  //fetch posts
  useEffect(() => {
    try {
      // get the posts of the username
      getUserPosts(username).then((response) =>
        setPosts(
          // sort by date
          response.data.sort((postA, postB) => {
            return new Date(postB.createdAt) - new Date(postA.createdAt);
          })
        )
      );
    } catch (error) {
      console.log(error);
    }
  }, [username, user._id]);

  return (
    <div className="profileFeed">
      <div className="profileFeedShare">
        {/*  if its the current user's profile, show share component */}
        {!username || username === user.username ? <Share /> : null}
      </div>
      {posts.length === 0 ? <NoPosts message={"no posts yet!"} /> : null}
      <div className="profileFeedPosts">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
