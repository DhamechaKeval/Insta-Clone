import React from "react";
import Nav1 from "../../shared/components/Nav1";
import Nav2 from "../../shared/components/Nav2";
import "../style/followpage.scss";
import User_card from "../components/User_card";

const Followers = () => {
  return (
    <main className="followers-page">
      <Nav1 />
      <div className="followers-list">
        <User_card />
        <User_card />
        <User_card />
        <User_card />
        <User_card />
        <User_card />
        <User_card />
        <User_card />
        <User_card />
        <User_card />
        <User_card />
        <User_card />
        <User_card />
        <User_card />
        <User_card />
        <User_card />
        <User_card />
      </div>
      <Nav2 />
    </main>
  );
};

export default Followers;
