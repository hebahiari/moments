import "./post.css";
import { Favorite } from "@mui/icons-material";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MoreVert } from "@mui/icons-material";

export default function PostLoading() {

    return (
        <div className="post">
            <div className="postTop">
                <div className="postTopLeft" style={{ 'gap': '10px' }}>
                    <Skeleton width='35px' height='35px' borderRadius='100px' />
                    <Skeleton width='100px' />
                </div>
                <div className="postTopRight">
                    <MoreVert />
                </div>
            </div>
            <div className="postCenter">
                <Skeleton width='200px' style={{ 'marginLeft': '25px' }} />
                <Skeleton height='300px' style={{ 'marginTop': '20px' }} />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <Favorite
                        className="likeIcon"
                        style={{ color: "#303030" }}
                    />
                    <img
                        src="https://petsgram-app.s3.us-west-1.amazonaws.com/chat-6820229_1280.png"
                        className="commentIcon"
                    />
                </div>
                <div className="postBottomRight">
                    <span
                        className="postCommentText"
                    > comments
                    </span>
                </div>
            </div>
        </div>
    );
}
