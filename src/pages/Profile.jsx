import React from "react";
import "../styles/Profile.css";
import Navbar from "../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { selectUser } from "../redux-store/slices/userSlice";
import { getAuth, signOut } from "firebase/auth";
import PlansBox from "../components/PlansBox/PlansBox";

const Profile = () => {
  const auth = getAuth();
  const user = useSelector(selectUser);

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-page-body">
        <h1>Edit Profile</h1>
        <div className="profile-page-info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="avatar-img"
          />
          <div className="profile-page-details">
            <h2>{user.email}</h2>
            <div className="profile-page-plans">
              <h3>Plans</h3>
              <PlansBox />
              <button onClick={() => signOut(auth)} className="sign-out-btn">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
