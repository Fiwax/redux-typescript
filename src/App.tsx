import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { getUsers } from "./redux/reducers/users";
import "./App.css";

function App() {
  const { loading, error, list } = useTypedSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <div>
        {list.map((user) => {
          return (
            <div key={user.id}>
              {user.name} - {user.phone}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
