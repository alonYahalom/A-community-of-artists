import React, { Component } from "react";
import PageHeader from "./common/page-header";
import Card from "./card";
import cardService from "../services/cardService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { swalConfirmDelete } from "../config.json";
import { toast } from "react-toastify";
import SimpleReactLightbox from "simple-react-lightbox";

class MyCards extends Component {
  state = {
    cards: [],
  };

  async componentDidMount() {
    const { data } = await cardService.getMyCards();

    if (data.length > 0) {
      this.setState({
        cards: data,
      });
    }
  }

  deleteCard = (e, cardId) => {
    e.preventDefault();

    Swal.fire(swalConfirmDelete).then((result) => {
      if (result.value) this.handelDelete(cardId);
    });
  };

  async handelDelete(cardId) {
    let { cards } = this.state;
    cards = cards.filter((card) => card._id !== cardId);

    this.setState({
      cards,
    });
    await cardService.deleteCard(cardId);
    toast("card is deleted");
  }

  render() {
    const { cards } = this.state;

    return (
      <SimpleReactLightbox>
        <div className="container">
          <PageHeader
            title="My Gallery"
            description="Here you can find all your arts"
          />
          <div className="row">
            <div className="col-12">
              <Link to="/create-card">
                <i className="fas fa-plus-circle mr-2"></i> Create Card
              </Link>
            </div>
          </div>
          <div className="row">
            {cards &&
              cards.map((card) => (
                <Card key={card._id} card={card} deleteCard={this.deleteCard} />
              ))}
          </div>
        </div>
      </SimpleReactLightbox>
    );
  }
}

export default MyCards;
