import React from "react";
import Form from "./common/form";
import PageHeader from "./common/page-header";
import Joi from "joi-browser";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";

class Signin extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    try {
      await userService.login(email, password);
      window.location = "/home";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/home" />;

    return (
      <div className="container">
        <PageHeader
          title="Signin Page"
          description="Signin With Your Acoount"
        />
        <div className="row">
          <div className="col-lg-6 m-auto">
            <form
              onSubmit={this.handleSubmit}
              action=""
              method="POST"
              className="mt-4"
              autoComplete="off"
            >
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Signin")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
