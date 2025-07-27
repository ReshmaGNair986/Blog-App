const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const BlogModel = require("./model");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://reshmagnair7:reshma26@cluster0.uytxbsm.mongodb.net/blogapp?retryWrites=true&w=majority&appName=Cluster0",
    { serverSelectionTimeoutMS: 5000 }
  )
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.log("❌ Error connecting to DB:", err));

app.post("/add", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;

    if (!title || !content || !img_url) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const newBlog = new BlogModel({ title, content, img_url });
    await newBlog.save();

    res.status(201).send({ message: "Blog added successfully!" });
  } catch (error) {
    console.log("❌ Error in POST /add:", error);
    res.status(500).send({ error: "Something went wrong" });
  }
});

app.get("/get", async (req, res) => {
  try {
    const data = await BlogModel.find();
    res.status(200).send(data);
  } catch (error) {
    console.log("❌ Error in GET /get:", error);
    res.status(500).send({ error: "Something went wrong" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await BlogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).send({ error: "Blog not found" });
    }

    res.status(200).send({ message: "Blog deleted successfully!" });
  } catch (error) {
    console.log("❌ Error in DELETE /delete:", error);
    res.status(500).send({ error: "Failed to delete blog" });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, img_url } = req.body;

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { title, content, img_url },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).send({ error: "Blog not found" });
    }

    res.status(200).send({ message: "Blog updated successfully!", updatedBlog });
  } catch (error) {
    console.log("❌ Error in PUT /update:", error);
    res.status(500).send({ error: "Failed to update blog" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
