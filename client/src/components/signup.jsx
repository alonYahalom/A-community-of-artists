import React from "react";
import PageHeader from "./common/page-header";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import userService from "../services/userService";
import { apiUrl } from "../config.json";
import { Redirect } from "react-router-dom";

class Signup extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().required().min(2).label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    try {
      await http.post(`${apiUrl}/users`, data);
      await userService.login(data.email, data.password);
      window.location = "/create-card";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({ errors: { email: "Email is taken" } });
      }
    }
  };
  render() {
    if (userService.getCurrentUser()) return <Redirect to="/home" />;
    return (
      <div className="container">
        <PageHeader
          title="Signup Page"
          description="Here you can open new  account for free!"
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
              {this.renderInput("name", "Your Name")}
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Next")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
