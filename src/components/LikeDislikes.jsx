import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axios from "axios";

const LikeDislikes = (props) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikeAction, setDislikeAction] = useState(null);
  const [variable, setVariable] = useState({});

  useEffect(() => {
    if (props.blog) {
      setVariable({ blogId: props.blogId, userId: props.userId });
    }

    axios
      .post("/getLikes", variable)
      .then((res) => {
        if (res.data.success) {
          setLikes(res.data.likes.length);
          res.data.likes.forEach((like) => {
            if (like.userId === props.userId) {
              setLikeAction("liked");
            }
          });
        } else {
          alert("Failed to get likes");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post("/getDislikes", variable)
      .then((res) => {
        if (res.data.success) {
          setDislikes(res.data.dislikes.length);
          res.data.dislikes.forEach((dislike) => {
            if (dislike.userId === props.userId) {
              setDislikeAction("disliked");
            }
          });
        } else {
          alert("Failed to get dislikes");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.blogId, props.userId]);

  const handleLike = (variable) => {
    if (likeAction === null) {
      axios
        .post(`/like/upLike`, variable)
        .then((res) => {
          if (res.data.success) {
            setLikes(likes + 1);
            setLikeAction("liked");

            if (dislikeAction !== null) {
              setDislikeAction(null);
              setDislikes(dislikes - 1);
            }
          } else {
            alert("Failed to increase the like");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("/like/unLike", variable)
        .then((res) => {
          if (res.data.success) {
            setLikes(likes - 1);
            setLikeAction(null);
          } else {
            alert("Failed to decrease the like");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDislike = (blogId) => {
    if (dislikeAction === null) {
      axios
        .post("/like/upDislike", variable)
        .then((res) => {
          if (res.data.success) {
            setDislikes(dislikes + 1);
            setDislikeAction("disliked");

            if (likeAction !== null) {
              setLikeAction(null);
              setLikes(likes - 1);
            }
          } else {
            alert("Failed to increase the dislike");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("/like/unDislike", variable)
        .then((res) => {
          if (res.data.success) {
            setDislikes(dislikes - 1);
            setDislikeAction(null);
          } else {
            alert("Failed to decrease the dislike");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <span key="like">
        <ThumbUpIcon
          onClick={() => handleLike(props.blog?._id)}
          style={{ cursor: "pointer" }}
        />
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{likes}</span>
      </span>
      &nbsp;&nbsp;
      <span key="dislike">
        <ThumbDownIcon
          onClick={() => handleDislike(props.blog?._id)}
          style={{ cursor: "pointer" }}
        />
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{dislikes}</span>
      </span>
      &nbsp;&nbsp;
    </>
  );
};

export default LikeDislikes;
