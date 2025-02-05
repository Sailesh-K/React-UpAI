import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Typography, Button } from "@mui/material";
import { useSpring, animated } from "react-spring";

function RichTextEditor() {
  const [content, setContent] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    return savedContent ? savedContent : "";
  });

  const animationProps = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 500 },
  });

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (content !== localStorage.getItem("editorContent")) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [content]);

  const handleSave = () => {
    localStorage.setItem("editorContent", content);
    console.log("Content saved:", content);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  const formats = ["header", "bold", "italic", "underline", "list", "bullet"];

  return (
    <animated.div style={animationProps}>
      <Box
        sx={{
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Rich Text Editor
        </Typography>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          style={{ height: "200px", marginBottom: "20px" }}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </animated.div>
  );
}

export default RichTextEditor;
