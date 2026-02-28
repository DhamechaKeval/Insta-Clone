import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import { addPost, dislikePost, getFeed, likePost } from "../services/post.api";

export const usePost = () => {
  const { loading, feed, post, setFeed, setLoading, setPost } =
    useContext(PostContext);

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.reverse());
    setLoading(false);
  };

  const handleAddPost = async (imageFile, caption) => {
    setLoading(true);
    const data = await addPost(imageFile, caption);
    setFeed([data.post, ...feed]);
    setLoading(false);
  };

  const handleLike = async (postId) => {
    setFeed((prevFeed) =>
      prevFeed.map((post) =>
        post._id === postId ? { ...post, isLiked: true } : post,
      ),
    );
    await likePost(postId);
  };
  const handleDislike = async (postId) => {
    setFeed((prevFeed) =>
      prevFeed.map((post) =>
        post._id === postId ? { ...post, isLiked: false } : post,
      ),
    );
    await dislikePost(postId);
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleAddPost,
    handleLike,
    handleDislike,
  };
};
