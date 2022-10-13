import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { MoreVert } from "@mui/icons-material";
import "./postPopover.css";
import { deletePost } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export function PostPopover({ postId, userId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [copied, setCopied] = React.useState(false);
  const currentUser = React.useContext(AuthContext).user;
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = () => {
    //TODO: add actual link
    navigator.clipboard.writeText(`posts/${postId}`);
    setCopied(true);
  };

  const handleDelete = () => {
    try {
      if (window.confirm("Delete post?")) {
        deletePost(postId, currentUser._id).then(history.go());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <MoreVert
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          <div className="popoverItem" onClick={handleCopy}>
            {!copied ? "copy link" : "copied!"}
          </div>
          {userId === currentUser._id ? (
            <>
              <hr className="popoverHr" />
              <div className="popoverItem" onClick={handleDelete}>
                delete
              </div>
            </>
          ) : null}
        </Typography>
      </Popover>
    </div>
  );
}
