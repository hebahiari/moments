import "./singlePost.css";
import Post from "../../components/post/Post";
import Comment from "../../components/comment/Comment";
import PostLoading from "../../components/post/PostLoading";

export default function SinglePost() {

    return (
        <>
            <div className="singlePostWrapper">
                <PostLoading />
                <div className="commentsSection">
                    <div className="commentsWrapper">
                        <h1 className="commentsTitle">Comments</h1>
                        <div className="comments">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
