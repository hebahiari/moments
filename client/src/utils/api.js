import axios from "axios";

export async function getFollowingPosts(id) {
  return await axios.get(`/posts/timeline/${id}`);
}

export async function getUserById(id) {
  return await axios.get(`/users?userId=${id}`);
}

export async function getUserByUsername(username) {
  return await axios.get(`/users?username=${username}`);
}

export async function getUserPosts(username) {
  return await axios.get(`/posts/profile/${username}`);
}

export async function loginCall(userCredentials, dispatch) {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
}

export async function registerUser(user) {
  const res = await axios.post("/auth/register", user);
}

export async function likeDislikePost(postId, userId) {
  const res = await axios.put(`/posts/${postId}/like`, { userId: userId });
}

export async function sharePost(post) {
  await axios.post("/posts", post);
}

export async function uploadImage(data) {
  await axios.post("/upload", data);
}

export async function getFollowingUsers(userId) {
  return await axios.get(`/users/following/${userId}`);
}
