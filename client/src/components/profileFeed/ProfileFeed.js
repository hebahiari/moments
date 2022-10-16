import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./profileFeed.css";
import { getUserPosts } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import NoPosts from "../noPosts/NoPosts";
import LoadingBar from "../loadingBar/LoadingBar";

export default function ProfileFeed() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const { username } = useParams();
  const [loading, setLoading] = useState(true);

  //fetch posts
  useEffect(() => {
    const abortController = new AbortController();
    try {
      // get the posts of the username
      setLoading(true);
      getUserPosts(username, abortController.signal).then((response) => {
        setPosts(
          // sort by date
          response.data.sort((postA, postB) => {
            return new Date(postB.createdAt) - new Date(postA.createdAt);
          })
        );
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    return () => abortController.abort();
  }, [username, user?._id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className="profileFeed">
      {/*  if its the current user's profile, show share component */}
      {!username || username === user?.username ? (
        <div className="profileFeedShare">
          <Share />
        </div>
      ) : null}

      {posts.length === 0 ? <NoPosts message={"no posts yet!"} /> : null}
      <div className="profileFeedPosts">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
