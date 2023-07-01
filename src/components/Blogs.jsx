import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBlogs, reset } from "../redux/reducers/blogSlice";
import blogService from "../http/blogService";
import LikeDislikes from "./LikeDislikes";
import DeleteIcon from "@mui/icons-material/Delete";

const Blogs = ({token}) => {
  const dispatch = useDispatch();
  const { blogs, isLoading, isError, message } = useSelector(
    (state) => state.blogs
  );

  useEffect(() => {
    dispatch(getBlogs());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleLike = async (blogId) => {
    try {
      await blogService.likeBlog(blogId, token);
      // Perform any necessary UI updates after liking the blog
    } catch (error) {
      // Handle error
      console.log(error.message);
    }
  };

  const handleDislike = async (blogId) => {
    try {
      await blogService.dislikeBlog(blogId, token);
      // Perform any necessary UI updates after disliking the blog
    } catch (error) {
      // Handle error
      console.log(error.message);
    }
  };


  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { lg: "repeat(4, 1fr)", md: "repeat(2, 1fr)" },
        gap: "20px",
      }}
    >
      {blogs &&
        blogs?.map((blog) => {
          return (
            <Box
              key={blog?._id}
              sx={{
                borderRadius: "14px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Link to={`/blog/${blog?._id}`}>
                {blog?.title}
              </Link>

              <Stack padding="20px 10px">
                <Typography variant="p" fontSize="22px" fontWeight={600}>
                  {blog?.title}
                </Typography>
                <Typography
                  variant="p"
                  sx={{ opacity: "0.85", lineHeight: "24px" }}
                >
                  {blog?.description}
                </Typography>



                <Box
                marginTop="10px"
                sx={{
                  textAlign: "right",
                }}
              >
                <LikeDislikes blogId={blog?._id} />
                </Box>
              </Stack>
            </Box>
          );
        })}
    </Box>
  );
};

export default Blogs;
