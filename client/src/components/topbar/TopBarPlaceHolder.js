import "./topbar.css";
import { Link, useHistory } from "react-router-dom";


export default function TopBarPlaceHolder() {

    return (
        <div className="topbarContainer">
            <div className="topbarCenter">
            </div>
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">Petsgram</span>
                </Link>
            </div>
            <div className="topbarRight">
                <ul className="topbarRightMenu">
                    <li className="topbarRightMenuItemNotification">
                    </li>
                    <li className="topbarRightMenuItem">
                    </li>
                </ul>
                <div className="topbarRightHamburgerIcon">
                </div>
            </div>
        </div>
    );
}
