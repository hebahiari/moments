import "./noPosts.css";

export default function NoPosts({ message }) {
  return (
    <div className="noPosts">
      <div className="noPostsTitle">{message}</div>

      <img
        src="https://petsgram-app.s3.us-west-1.amazonaws.com/sadcat.gif"
        alt=""
        className="noPostsImg"
      />
    </div>
  );
}
