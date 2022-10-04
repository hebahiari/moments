import "./post.css";
import { MoreVert, Favorite } from "@mui/icons-material";
import { Users } from "../../dummyData";

export default function Post({post}) {

    const user = Users.filter((user) => user.id == post.userId)[0]

    return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={user.profilePicture} className="postProfileImg" alt="" />
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert className="" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={post.photo} className="postImg" alt="" />
        </div>
        <div className="postBottom">
            <div className="postBottomLeft">
                <Favorite className="likeIcon"/>
                <span className="postLikeCounter">
                    {post.like} people like it
                </span>
            </div>
            <div className="postBottomRight">
                <span className="postCommentText"> {post.comment} Comments</span>
            </div>
        </div>
      </div>
    </div>
  );
}
