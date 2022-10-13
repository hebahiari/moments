import * as React from "react";
import "./topbarPopover.css";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function TopbarPopover({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        src={user.profilePicture}
        alt="profile"
        className="topbarImage"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
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
              to={`/profile/${user.username}`}
              style={{ textDecoration: "none", color: "#555555" }}
            >
              profile
            </Link>
          </span>
          <hr className="TopbarPopoverHr" />
          <span
            className="topbarRightHamburgerItem"
            //   onClick={handleLogout}
          >
            logout
          </span>
        </Typography>
      </Popover>
    </div>
  );
}
