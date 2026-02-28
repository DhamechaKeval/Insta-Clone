import React from "react";
import Nav1 from "../../shared/components/Nav1";
import Nav2 from "../../shared/components/Nav2";
import User_card from "../components/User_card";
import "../style/followpage.scss";

const Request = () => {
  return (
    <main className="request-page">
      <Nav1 />
      <div className="request-list">
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

export default Request;
