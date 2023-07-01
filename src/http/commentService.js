import api from "./axiosPublic";
import axios from "axios";

const createComment = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.post("/comments", data, config);

  return response.data.comment;
};

const getComments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get("/comments", config);

  return response.data.comments;
};

const getComment = async (commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`/comments/${commentId}`, config);

  return response.data.comment;
};

const likeComment = async (commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `/api/comments/${commentId}/like`,
      {},
      config
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message;
    } else {
      throw error.message || "Failed to like comment";
    }
  }
};

const dislikeComment = async (commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `/api/comments/${commentId}/dislike`,
      {},
      config
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message;
    } else {
      throw error.message || "Failed to dislike comment";
    }
  }
};

const updateComment = async (commentId, content, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.patch(`/comments/${commentId}`, content, config);
  return response.data.comment;
};

const deleteComment = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.delete(`/comments/${id}`, config);

  return response.data;
};

const commentService = {
  createComment,
  getComments,
  likeComment,
  dislikeComment,
  updateComment,
  deleteComment,
  getComment,
};

export default commentService;
