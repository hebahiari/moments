import "./singlePost.css";
import TopBar from "../../components/topbar/TopBar";
import { useParams } from "react-router-dom";
import { getPost, getPostComments } from "../../utils/api";
import { useEffect, useState } from "react";
import Post from "../../components/post/Post";
import Comments from "../../components/comments/Comments";

export default function SinglePost() {
  const postId = useParams().postId;
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    try {
      getPost(postId)
        .then((response) => setPost(response.data))
        .then(getPostComments(postId))
        .then((response) => setComments(response));
    } catch (error) {
      if (error.name === "AbortError") {
        // Ignore `AbortError`
        console.log("Aborted");
      } else {
        throw error;
      }
    }
    return () => abortController.abort();
  }, [postId]);

  return (
    <>
      <TopBar />
      <div className="singlePostWrapper">
        {post._id ? <Post post={post} /> : null}
        {comments.length ? <Comments comments={comments} /> : null}
      </div>
    </>
  );
}
