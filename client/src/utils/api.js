import axios from "axios";

//server's URL
const API_BASE_URL = "/api";
// process.env.REACT_APP_API_BASE_URL;

// to users
export async function getUserById(userId) {
  return await axios.get(`${API_BASE_URL}/users?userId=${userId}`);
}

export async function getUserByUsername(username) {
  return await axios.get(`${API_BASE_URL}/users?username=${username}`);
}

export async function getFollowersUsers(userId) {
  return await axios.get(`${API_BASE_URL}/users/followers/${userId}`);
}

export async function followUser(userId, currentUserId) {
  return await axios.put(`${API_BASE_URL}/users/${userId}/follow`, {
    userId: currentUserId,
  });
}

export async function unfollowUser(userId, currentUserId) {
  return await axios.put(`${API_BASE_URL}/users/${userId}/unfollow`, {
    userId: currentUserId,
  });
}

export async function findMatchingUsernames(username) {
  return await axios.get(`${API_BASE_URL}/users/search/${username}`);
}

export async function updateProfilePicture(img, userId) {
  return await axios.put(`${API_BASE_URL}/users/${userId}/img`, {
    data: { img: img },
  });
}

export async function updateCoverPhoto(cover, userId) {
  return await axios.put(`${API_BASE_URL}/users/${userId}/cover`, {
    data: { cover: cover },
  });
}

export async function getFollowingUsers(userId) {
  return await axios.get(`${API_BASE_URL}/users/following/${userId}`);
}

export async function userFollowsProfile(userId, currentUserId) {
  return await axios.get(
    `${API_BASE_URL}/users/${userId}/followers/${currentUserId}`
  );
}

export async function clearNotifications(userId) {
  return await axios.put(`${API_BASE_URL}/users/${userId}/clear`);
}

export async function getUserNotifications(userId) {
  return await axios.get(`${API_BASE_URL}/users/${userId}/notifications`);
}

export async function addPet(newPet) {
  return await axios.post(`${API_BASE_URL}/users/pets`, { data: newPet });
}

// to posts
export async function getFollowingPosts(userId) {
  return await axios.get(`${API_BASE_URL}/posts/timeline/${userId}`);
}

export async function getAllPosts() {
  return await axios.get(`${API_BASE_URL}/posts/timeline/all`);
}

export async function getUserPosts(username) {
  return await axios.get(`${API_BASE_URL}/posts/profile/${username}`);
}

export async function likeDislikePost(postId, userId) {
  return await axios.put(`${API_BASE_URL}/posts/like/${postId}`, {
    data: {
      userId: userId,
    },
  });
}

export async function sharePost(post) {
  return await axios.post(`${API_BASE_URL}/posts`, { data: post });
}

export async function getPost(postId) {
  return await axios.get(`${API_BASE_URL}/posts/${postId}`);
}

export async function deletePost(postId, userId) {
  return await axios.delete(`${API_BASE_URL}/posts/${postId}/${userId}`);
}

//TODO: update post

// to auth

export async function loginCall(userCredentials, dispatch) {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, {
      data: userCredentials,
    });
    localStorage.setItem("storedUser", JSON.stringify(res.data));
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
}

export async function registerUser(user) {
  return await axios.post(`${API_BASE_URL}/auth/register`, { data: user });
}

// to comments

export async function sendComment(comment) {
  return await axios.post(`${API_BASE_URL}/comments`, { data: comment });
}

export async function getPostComments(postId) {
  return await axios.get(`${API_BASE_URL}/comments/${postId}`);
}

export async function deleteComment(commentId, userId) {
  return await axios.delete(
    `${API_BASE_URL}/comments/${commentId}/delete/${userId}`
  );
}

// to upload

export async function uploadImage(data) {
  return await axios.post(`${API_BASE_URL}/upload`, data);
}
