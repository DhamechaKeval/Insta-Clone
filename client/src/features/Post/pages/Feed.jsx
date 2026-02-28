import React, { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import Nav2 from "../../shared/components/Nav2";
import Nav1 from "../../shared/components/Nav1";

const Feed = () => {
  const { handleGetFeed, feed, loading, handleDislike, handleLike } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <Nav1 />
        <h1>Feed Loading...</h1>
        <Nav2 />
      </main>
    );
  }

  return (
    <main className="feed-page">
      <Nav1 />
      <div className="feed">
        <div className="posts">
          {feed.map((post, idx) => {
            return (
              <Post
                key={idx}
                user={post.user}
                post={post}
                handleLike={handleLike}
                handleDislike={handleDislike}
              />
            );
          })}
        </div>
      </div>
      <Nav2 />
    </main>
  );
};

export default Feed;
