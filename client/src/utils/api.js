import axios from "axios";

export async function getFollowingPosts() {
  return await axios.get("/posts/timeline/633f15cff4cd896359bf1d6a");
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
