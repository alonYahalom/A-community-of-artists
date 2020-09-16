import React from "react";
import Form from "./common/form";
import PageHeader from "./common/page-header";
import Joi from "joi-browser";
import cardService from "../services/cardService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class CreateCard extends Form {
  state = {
    data: {
      title: "",
      description: "",
      phone: "",
      image: "",
    },
    errors: {},
  };

  schema = {
    title: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(450).required(),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    image: Joi.string().min(11).max(1024).uri(),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    await cardService.createCard(data);
    toast("A new card is opened");
    this.props.history.replace("/my-gallery");
  };

  render() {
    return (
      <div className="container">
        <PageHeader
          title="Create Card Page"
          description="Create Your bz Card Here!"
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
              {this.renderInput("title", "Art Title")}
              {this.renderInput("description", "Description")}
              {this.renderInput("phone", "Phone")}
              {this.renderInput("image", "Image")}
              {this.renderButton("Create Card")}
              <Link className="btn btn-muted float-right" to="/my-gallery">
                Skip
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCard;
