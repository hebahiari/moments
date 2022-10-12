import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//TODO: remove default user
const INITIAL_STATE = {
  user: null,
  // {
  //   _id: "6346056f003f46fccb36ad4d",
  //   username: "the-heba",
  //   email: "heba@gmail.com",
  //   profilePicture:
  //     "https://petsgram-app.s3.us-west-1.amazonaws.com/m9eXLgnY6-45672425.jpg",
  //   coverPhoto:
  //     "https://img.freepik.com/free-vector/animal-background-vector-with-cute-pets-illustration_53876-127698.jpg?w=2000",
  //   followers: [],
  //   following: [],
  //   __v: 0,
  // },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
