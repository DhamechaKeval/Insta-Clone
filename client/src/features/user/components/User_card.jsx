import React from "react";

const User_card = () => {
  return (
    <div className="user-card">
      <div className="user-details">
        <img
          src="https://ik.imagekit.io/Kevaldhamecha/user-profile-icon-avatar.webp?updatedAt=1771944304092"
          alt=""
        />
        <p>username</p>
      </div>
      <div className="button">
        <div className="button primary-button">follow</div>
      </div>
    </div>
  );
};

export default User_card;
