import api from "./axiosPublic";
import axios from "axios";

// const token = JSON.parse(localStorage.getItem("token"))
const BASE_URL = "https://blog-backend-api-p4jb.onrender.com";

// const token = JSON.parse(localStorage.getItem("token"));

const createBlog = async (data) => {
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await api.post("/posts", data, config);
    return response.data.post;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const getBlog = async (blogId) => {
  // const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await api.get(`/posts/${blogId}`, config);
    return response.data.post;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getBlogs = async (token) => {
  // const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await api.get("/posts", config);
    return response.data.posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteBlog = async (blogId) => {
  // const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await api.delete(`/posts/${blogId}`, config);
    return response.data.post;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// const likeBlog = async (blogId) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await api.put(`/posts/${blogId}/like`, {}, config);
//   return response.data;
// };

// const dislikeBlog = async (blogId) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await api.put(`/posts/${blogId}/dislike`, {}, config);
//   return response.data;
// };

const getLikes = async (blogId) => {
  const response = await axios.post(`${BASE_URL}/like/getLikes`, {
    blogId,
  });
  return response.data;
}

const getDislikes = async (blogId) => {
  const response = await axios.post(`${BASE_URL}/like/getDislikes`, {
    blogId,
  });
  return response.data;
}

const likeBlog = async (blogId) => {
  const response = await axios.post(`${BASE_URL}/like/upLike`, {
    blogId,
  });
  return response.data;
}

const dislikeBlog = async (blogId) => {
  const response = await axios.post(`${BASE_URL}/like/upDislike`, {
    blogId,
  });
  return response.data;
}




const blogService = {
  createBlog,
  getBlog,
  getBlogs,
  deleteBlog,
  getLikes,
  getDislikes,
  likeBlog,
  dislikeBlog,
};

export default blogService;
