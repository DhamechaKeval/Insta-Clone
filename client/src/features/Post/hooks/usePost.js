import { useContext } from "react";
import { PostContext } from "../post.context";
import { getFeed } from "../services/post.api";

export const usePost = () => {
  const { loading, feed, post, setFeed, setLoading, setPost } =
    useContext(PostContext);

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.reverse());
    setLoading(false);
  };

  return { loading, feed, post, handleGetFeed };
};
