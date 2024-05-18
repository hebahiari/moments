import "./singlePost.css";
import TopBar from "../../components/topbar/TopBar";
import { useParams } from "react-router-dom";
import { getPost, getPostComments } from "../../utils/api";
import { useEffect, useState } from "react";
import Post from "../../components/post/Post";
import Comment from "../../components/comment/Comment";
import NotFound from "../notFound/NotFound";
import PostLoading from "../../components/post/PostLoading";

export default function SinglePost() {
  const postId = useParams().postId;
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    try {
      setLoading(true);
      getPost(postId, abortController.signal).then((response) =>
        setPost(response.data)
      );
      getPostComments(postId, abortController.signal)
        .then((response) => {
          setComments(
            response.data.sort((postA, postB) => {
              return new Date(postB.createdAt) - new Date(postA.createdAt);
            })
          );
          setLoading(false);
        })
        .catch((error) => console.log(error));
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

  if (!post._id && !loading) {
    return <NotFound />;
  }

  if (loading) {
    return null;
  }

  return (
    <>
      <div className="singlePostWrapper">
        {post._id ? <Post post={post} /> : <PostLoading />}
        <div className="commentsSection">
          <div className="commentsWrapper">
            <h1 className="commentsTitle">Comments</h1>
            <div className="comments">
              {comments.length === 0 ? (
                <div className="commentsText">No Comments!</div>
              ) : null}
              {comments?.length
                ? comments.map((comment) => (
                  <Comment comment={comment} key={comment._id} />
                ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
