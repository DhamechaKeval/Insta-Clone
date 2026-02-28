import React from "react";
import {
  RiHeart3Line,
  RiChatAi4Line,
  RiBookmarkLine,
  RiShareForwardLine,
} from "@remixicon/react";

const Post = () => {
  return (
    <div className="post">
      <div className="top">
        <div className="profile-pic">
          <img
            src="https://ik.imagekit.io/Kevaldhamecha/user-profile-icon-avatar.webp?updatedAt=1771944304092://via.placeholder.com/150"
            alt="profile"
          />
        </div>
        <h3>username_here</h3>
      </div>

      <div className="image">
        <img
          src="https://ik.imagekit.io/Kevaldhamecha/Photo_5y5vULHTl.jpg?updatedAt=1771999398645"
          alt="post"
        />
      </div>

      <div className="bottom">
        <div className="icons">
          <div className="left-icons">
            <button>
              <RiHeart3Line size={28} />
            </button>
            <button>
              <RiChatAi4Line size={28} />
            </button>
            <button>
              <RiShareForwardLine size={28} />
            </button>
          </div>

          <div className="right-icons">
            <button>
              <RiBookmarkLine size={28} />
            </button>
          </div>
        </div>

        <div className="caption">
          <span className="caption-by">username_here </span>
          This is a sample caption for UI design.
        </div>
      </div>
    </div>
  );
};

export default Post;
