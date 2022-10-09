import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//TO DO: remove default user
const INITIAL_STATE = {
  user: null,
  // {
  //   _id: "633f6c2971566330c5e10b01",
  //   username: "heba",
  //   email: "hebahiary@gmail.com",
  //   followers: [],
  //   following: [],
  //   isAdmin: false,
  //   pets: [],
  //   profilePicture:
  //     "https://i.pinimg.com/originals/d4/c2/37/d4c237f890bf1e61e0e253325156ac4d.jpg",
  //   coverPhoto:
  //     "https://img.freepik.com/free-vector/animal-background-vector-with-cute-pets-illustration_53876-127698.jpg?w=2000",
  //   createdAt: "2022-10-07T00:00:41.632Z",
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
