import * as React from "react";
import { useHistory } from "react-router-dom";
import "./topbarPopover.css";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function TopbarPopover({ user, handleLogout, dispatch }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <img
        src={user?.profilePicture}
        alt="profile"
        className="topbarImage"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />
      <Popover
        className="topbarPopover"
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
          <span className="topbarRightHamburgerItem">
            <Link
              to={`/profile/${user?.username}`}
              style={{ textDecoration: "none", color: "#555555" }}
            >
              profile
            </Link>
          </span>
          {user?.username == "guest-user" ? (
            <>
              <hr className="TopbarPopoverHr" />
              <span
                className="topbarRightHamburgerItem"
                onClick={() => {
                  localStorage.clear();
                  dispatch({ type: "LOGOUT" });
                  history.push("/register");
                }}
              >
                sign up
              </span>
            </>
          ) : null}
          <hr className="TopbarPopoverHr" />
          <span className="topbarRightHamburgerItem" onClick={handleLogout}>
            logout
          </span>
        </Typography>
      </Popover>
    </div>
  );
}
