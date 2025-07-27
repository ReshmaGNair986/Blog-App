import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Box } from "@mui/material";

export default function Add() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img_url, setImgUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/add", {
        title,
        content,
        img_url,
      });
      alert("Blog added successfully!");
      setTitle("");
      setContent("");
      setImgUrl("");
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Failed to add blog!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Content"
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          value={img_url}
          onChange={(e) => setImgUrl(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#9C27B0" }}
        >
          SUBMIT
        </Button>
      </Box>
    </Container>
  );
}
