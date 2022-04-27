import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Private = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.private(store.token);
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Dashboard</h1>
      <p>Welcome {store.message}!</p>
      <div className="alert alert-info">
        {store.token
          ? "You're logged in!"
          : "You're not Logged In, Please Log In!"}
      </div>
      <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
          Read documentation
        </a>
      </p>
    </div>
  );
};
