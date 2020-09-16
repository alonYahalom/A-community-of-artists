import React from "react";
import PageHeader from "./common/page-header";
import Joi from "joi-browser";
import Form from "./common/form";
import cardService from "../services/cardService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class EditCard extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      description: "",
      phone: "",
      image: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(450).required(),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    image: Joi.string().min(11).max(1024).uri(),
  };

  async componentDidMount() {
    const cardId = this.props.match.params.id;
    const { data } = await cardService.getCard(cardId);

    this.setState({ data: this.mapToViewModel(data) });
  }

  mapToViewModel(card) {
    const str = card.title.toLowerCase();
    const titleValue = str.trim();
    return {
      _id: card._id,
      title: titleValue,
      description: card.description,
      phone: card.phone,
      image: card.image,
    };
  }

  doSubmit = async () => {
    const { data } = this.state;

    const str = data.title.toLowerCase();
    const titleValue = str.trim();

    let newData = {
      _id: data._id,
      title: titleValue,
      description: data.description,
      image: data.image,
      phone: data.phone,
    };

    await cardService.editCard(newData);
    toast("Card is Updated");
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
              {this.renderButton("Update Card")}
              <Link className="btn btn-muted float-right" to="/my-gallery">
                Cencel
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCard;
