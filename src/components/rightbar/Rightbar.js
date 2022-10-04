import "./rightbar.css"
import {Celebration} from "@mui/icons-material"

export default function Rightbar() {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          < Celebration className="birthdayImg"/>
          <span className="birthdayText">
            <b> Heba A </b> and <b> 3 other friends </b> have a birthday today
          </span>
        </div>
        <img src="assets/pictures/ad.jpg" className="rightbarAd" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img src="assets/people/3.png" className="rightbarProfileImg" alt="" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Fruitti H</span>
          </li>
        </ul>
      </div>

    </div>
  )
}
