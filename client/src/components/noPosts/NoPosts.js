import "./noPosts.css";

export default function NoPosts({ message }) {
  return (
    <div className="noPosts">
      <div className="noPostsTitle">{message}</div>

      <img src="/assets/website/sadcat.gif" alt="" className="noPostsImg" />
    </div>
  );
}
