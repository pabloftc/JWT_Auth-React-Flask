import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../styles/home.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const history = useHistory();

  return (
    <div className="container justify-content-center text-center mt-5 w-50">
      <h1 className="mb-5">Sign Up</h1>
      <form
        className="mb-5"
        onSubmit={handleSubmit(async (data) => {
          console.log(data);
          const serverResponse = await actions.signup(
            data.email,
            data.password
          );
          console.log(serverResponse);
          if (serverResponse === true) {
            alert("You've been registered!");
            history.push("/login");
          } else {
            alert("There's an error, try again");
            history.push("/");
          }
        })}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            {...register("email", { required: "Este campo es requerido" })}
            type="email"
            className="form-control"
            placeholder="name@domain.com"
            id="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            {...register("password", { required: "Este campo es requerido" })}
            type="password"
            className="form-control"
            placeholder="Create a Password"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
