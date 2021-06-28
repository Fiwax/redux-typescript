import { Dispatch } from "redux";
import { IUser } from "../../types/users";

enum UsersActionTypes {
  GET_USERS = "GET_USERS",
  GET_USERS_ERROR = "GET_USERS_ERROR",
  REMOVE_LOADING = "REMOVE_LOADING",
}

interface IUserState {
  list: IUser[];
  loading: boolean;
  error: null | string;
}

const intialState: IUserState = {
  list: [],
  loading: true,
  error: null,
};

interface GetUsers {
  type: UsersActionTypes.GET_USERS;
  payload: IUser[];
}

interface GetUsersError {
  type: UsersActionTypes.GET_USERS_ERROR;
  payload: string;
}

interface RemoveLoading {
  type: UsersActionTypes.REMOVE_LOADING;
  payload: boolean;
}

type UserAction = GetUsers | GetUsersError | RemoveLoading;

export default (state = intialState, action: UserAction): IUserState => {
  switch (action.type) {
    case UsersActionTypes.GET_USERS: {
      return { ...state, list: action.payload };
    }
    case UsersActionTypes.GET_USERS_ERROR: {
      return { ...state, error: action.payload };
    }
    case UsersActionTypes.REMOVE_LOADING: {
      return { ...state, loading: action.payload };
    }
    default:
      return state;
  }
};

export function getUsers() {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const users = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      ).then((response) => response.json());
      dispatch({ type: UsersActionTypes.GET_USERS, payload: users });
      dispatch({ type: UsersActionTypes.REMOVE_LOADING, payload: false });
    } catch {
      dispatch({
        type: UsersActionTypes.GET_USERS_ERROR,
        payload: "Error happaned",
      });
    }
  };
}
