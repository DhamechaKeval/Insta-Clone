import React from "react";
import Nav1 from "../../shared/components/Nav1";
import Nav2 from "../../shared/components/Nav2";
import "../style/profile.scss";
import Post from "../components/Post";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <main className="profile-page">
      <Nav1 />
      <div className="profile-details">
        <div className="user-details">
          <div className="profile-pic">
            <img
              src="https://ik.imagekit.io/Kevaldhamecha/user-profile-icon-avatar.webp?updatedAt=1771944304092"
              alt=""
            />
          </div>
          <div className="username-followetails">
            <div className="username">username</div>
            <div className="follow-details">
              <div
                onClick={() => {
                  navigate("/profile/followers");
                }}
                style={{ cursor: "pointer" }}
                className="follower"
              >
                <h4>10</h4>
                <h5>followers</h5>
              </div>
              <div
                onClick={() => {
                  navigate("/profile/following");
                }}
                style={{ cursor: "pointer" }}
                className="following"
              >
                <h4>10</h4>
                <h5>following</h5>
              </div>
              <div
                onClick={() => {
                  navigate("/profile/request");
                }}
                style={{ cursor: "pointer" }}
                className="request"
              >
                <h4>10</h4>
                <h5>Request</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="bio">Bio</div>
        <div className="posts">
          <Post />
        </div>
      </div>
      <Nav2 />
    </main>
  );
};

export default Profile;
