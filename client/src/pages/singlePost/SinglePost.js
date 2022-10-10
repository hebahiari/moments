import "./singlePost.css";
import TopBar from "../../components/topbar/TopBar";
import { useParams } from "react-router-dom";
import { getPost, getPostComments } from "../../utils/api";
import { useEffect, useState } from "react";
import Post from "../../components/post/Post";
import Comment from "../../components/comment/Comment";

export default function SinglePost() {
  const postId = useParams().postId;
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    try {
      getPost(postId).then((response) => setPost(response.data));
      getPostComments(postId).then((response) => setComments(response.data));
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
        <div className="commentsWrapper">
          {comments?.length
            ? comments.map((comment) => <Comment comment={comment} />)
            : null}
        </div>
      </div>
    </>
  );
}
