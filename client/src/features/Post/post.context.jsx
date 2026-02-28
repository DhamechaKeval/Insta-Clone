import { createContext, useState } from "react";
import Post from "./components/Post";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState(null);
  const [post, setPost] = useState(null);

  return (
    <PostContext.Provider
      value={{ loading, feed, post, setFeed, setLoading, setPost }}
    >
      {children}
    </PostContext.Provider>
  );
};
