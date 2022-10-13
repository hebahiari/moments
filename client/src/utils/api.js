import axios from "axios";
//server's URL
const API_BASE_URL =
  // process.env.REACT_APP_API_BASE_URL ||
  "https://petsgram-website-backend.herokuapp.com";

// to users
export async function getUserById(id) {
  return await axios.get(`${API_BASE_URL}/users?userId=${id}`);
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
  return await axios.put(`${API_BASE_URL}/users/${userId}/img`, { img: img });
}

export async function getFollowingUsers(userId) {
  return await axios.get(`${API_BASE_URL}/users/following/${userId}`);
}

// to posts
export async function getFollowingPosts(id) {
  return await axios.get(`${API_BASE_URL}/posts/timeline/${id}`);
}

export async function getAllPosts() {
  return await axios.get(`${API_BASE_URL}/posts/timeline/all`);
}

export async function getUserPosts(username) {
  return await axios.get(`${API_BASE_URL}/posts/profile/${username}`);
}

export async function likeDislikePost(postId, userId) {
  return await axios.put(`${API_BASE_URL}/posts/${postId}/like`, {
    userId: userId,
  });
}

export async function sharePost(post) {
  return await axios.post(`${API_BASE_URL}/posts`, post);
}

export async function getPost(postId) {
  return await axios.get(`${API_BASE_URL}/posts/${postId}`);
}

export async function deletePost(postId, userId) {
  return await axios.delete(`${API_BASE_URL}/posts/${postId}/${userId}`);
}

// to auth

export async function loginCall(userCredentials, dispatch) {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, userCredentials);
    localStorage.setItem("storedUser", JSON.stringify(res.data));
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
}

export async function registerUser(user) {
  return await axios.post(`${API_BASE_URL}/auth/register`, user);
}

// to comments

export async function sendComment(comment) {
  console.log({ comment });
  return await axios.post(`${API_BASE_URL}/comments`, comment);
}

export async function getPostComments(postId) {
  return await axios.get(`${API_BASE_URL}/comments/${postId}`);
}

// to upload

export async function uploadImage(data) {
  return await axios.post(`${API_BASE_URL}/upload`, data);
}
