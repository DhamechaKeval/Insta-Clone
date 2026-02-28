import React from "react";
import {
  RiAddBoxLine,
  RiAccountCircleFill,
  RiHome4Line,
} from "@remixicon/react";
import { useNavigate } from "react-router";

const Nav2 = () => {
  const navigate = useNavigate();
  return (
    <div className="nav2">
      <button
        onClick={() => {
          navigate("/add-post");
        }}
      >
        <RiAddBoxLine />
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        <RiHome4Line />
      </button>
      <button
        onClick={() => {
          navigate("/profile");
        }}
      >
        <RiAccountCircleFill />
      </button>
    </div>
  );
};

export default Nav2;
