import React, { useRef, useState } from "react";
import "../style/addpost.scss";
import Nav1 from "./../../shared/components/Nav1";
import Nav2 from "./../../shared/components/Nav2";
import { useNavigate } from "react-router";
import { usePost } from "../hooks/usePost";

const Addpost = () => {
  const [caption, setCaption] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const postImageInputFieldRef = useRef(null);
  const navigate = useNavigate();
  const { handleAddPost, loading } = usePost();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = postImageInputFieldRef.current.files[0];
    await handleAddPost(file, caption);
    navigate("/");
  };

  if (loading) {
    return (
      <main>
        <Nav1 />
        <h1>Post Create ..</h1>
        <Nav2 />
      </main>
    );
  }

  return (
    <main className="add-post-page">
      <div className="add-post">
        <Nav1 />
        <div className="post-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="file">
              {selectedFile ? selectedFile.name : "Choose a file"}
            </label>

            <input
              ref={postImageInputFieldRef}
              hidden
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
            />

            <input
              onChange={(e) => {
                setCaption(e.target.value);
              }}
              value={caption}
              type="text"
              spellCheck="false"
              name="caption"
              placeholder="Write Caption here"
            />

            <button className="button primary-button">Add Post</button>
          </form>
        </div>
        <Nav2 />
      </div>
    </main>
  );
};

export default Addpost;
