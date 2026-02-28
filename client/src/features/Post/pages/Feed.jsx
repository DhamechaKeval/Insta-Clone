import React, { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";

const Feed = () => {
  const { handleGetFeed, feed, loading } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed Loading...</h1>
      </main>
    );
  }

  return (
    <main className="feed-page">
      <div className="feed">
        <div className="posts">
          {feed.map((post, idx) => {
            return <Post key={idx} user={post.user} post={post} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
