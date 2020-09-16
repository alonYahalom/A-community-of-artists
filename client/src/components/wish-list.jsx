import React, { Component } from "react";
import PageHeader from "./common/page-header";
import FavCards from "./fav-cards";
import SimpleReactLightbox from "simple-react-lightbox";

class WishList extends Component {
  constructor() {
    super();
    this.onUnLike = this.onUnLike.bind(this);
    let comments = JSON.parse(localStorage.getItem("saveFavorites"));
    this.state = {
      favCards: comments,
    };
  }

  onUnLike(e, card) {
    e.preventDefault();
    const { favCards } = this.state;
    const removeCard = favCards.indexOf(card);
    favCards.splice(removeCard, 1);
    localStorage.setItem("saveFavorites", JSON.stringify(favCards));
    this.setState({ favCards });
  }

  render() {
    const { favCards } = this.state;
    return (
      <SimpleReactLightbox>
        <div className="container">
          <PageHeader
            title="Here youy have the favorite arts"
            description="here you can see and post art card"
          />
          <p className="text-center">
            * When you do logout your favorites will delete
          </p>
          <div className="row">
            {favCards &&
              favCards.map((fav) => {
                return (
                  <FavCards key={fav._id} card={fav} onUnLike={this.onUnLike} />
                );
              })}
          </div>
        </div>
      </SimpleReactLightbox>
    );
  }
}

export default WishList;
