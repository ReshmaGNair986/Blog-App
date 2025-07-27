import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import axios from "axios";

const staticPosts = [
  {
    id: 1,
    title: "To Travel Is To Live",
    category: "Travel",
    image:
      "https://img.freepik.com/premium-photo/wonderful-scenery-relaxing-beach-tropical-landscape-background-summer-vacation-travel-holidays_663265-5306.jpg",
  },
  {
    id: 2,
    title: "Creativity Takes Courage",
    category: "Art",
    image:
      "https://i.pinimg.com/736x/e2/33/db/e233dbf8aee90fac53d6c7ac69ee4a3f.jpg",
  },
  {
    id: 3,
    title: "Bite Into Bliss",
    category: "Food",
    image:
      "https://3quarksdaily.com/wp-content/uploads/2025/05/food-aesthetics-2.jpg",
  },
];

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    axios
      .get("http://localhost:3001/get")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log("Error fetching blogs:", err));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      alert("Blog deleted successfully!");
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog!");
    }
  };

  const handleUpdate = async (id) => {
    const newTitle = prompt("Enter new title:");
    const newContent = prompt("Enter new content:");
    const newImage = prompt("Enter new image URL:");

    if (!newTitle || !newContent || !newImage) {
      alert("All fields are required!");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/update/${id}`, {
        title: newTitle,
        content: newContent,
        img_url: newImage,
      });

      alert("Blog updated successfully!");
      fetchBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog!");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {}
        {staticPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={post.image}
                alt={post.title}
              />
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  {post.category}
                </Typography>
                <Typography variant="h6">{post.title}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ backgroundColor: "#9C27B0" }}
                >
                  DELETE
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ backgroundColor: "#9C27B0" }}
                >
                  UPDATE
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {}
        {blogs.map((blog, index) => (
  <Grid item xs={12} sm={6} md={4} key={index}>
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={blog.img_url}
        alt={blog.title}
      />
      <CardContent>
        {}
        <Typography variant="subtitle2" color="textSecondary">
          {blog.content}
        </Typography>

        {}
        <Typography variant="h6">{blog.title}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "#9C27B0" }}
          onClick={() => handleDelete(blog._id)}
        >
          DELETE
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "#9C27B0" }}
          onClick={() => handleUpdate(blog._id)}
        >
          UPDATE
        </Button>
      </CardActions>
    </Card>
  </Grid>
 ))}
      </Grid>
    </Container>
  );
}
