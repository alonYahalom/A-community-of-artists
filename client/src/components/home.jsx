import React, { Component } from "react";
import PageHeader from "./common/page-header";
import SimpleReactLightbox from "simple-react-lightbox";
import cardService from "../services/cardService";
import AllCards from "./all-cards";
import SearchBar from "./search";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.onLike = this.onLike.bind(this);
  }
  state = {
    searchCard: [],
    cards: [],
    val: "",
    searchX: false,
    favCard: [],
  };

  onSearchClick(val) {
    const { cards } = this.state;
    const str = val.toLowerCase();
    const titleValue = str.trim();
    const searchFilter = cards.filter((cardFromRes) => {
      const resTitle = cardFromRes.title;
      const result = resTitle.includes(titleValue);
      if (result) {
        return cardFromRes;
      }
    });
    this.setState({ searchCard: searchFilter });
    this.setState({ searchX: true });
  }

  async componentDidMount() {
    const { data } = await cardService.getAllCards();

    if (data.length > 0) {
      this.setState({
        cards: data,
      });
    }
  }

  onSearchChange(val) {
    if (!val) {
      this.setState({ searchX: false });
    }
  }

  onLike(e, card) {
    e.preventDefault();
    let color = e.target.style.color;
    if (color === "grey") {
      e.target.style.color = "red";
      this.setState({ favCard: card }, () => {
        this.saveToLocal();
      });
    }
  }

  saveToLocal() {
    let x = this.state.favCard;
    let a = JSON.parse(localStorage.getItem("saveFavorites")) || [];
    a.push(x);
    localStorage.setItem("saveFavorites", JSON.stringify(a));
  }

  render() {
    const { user } = this.props;
    const { searchCard, searchX, cards } = this.state;

    return (
      <SimpleReactLightbox>
        <div className="container">
          <PageHeader
            title="Wellcome To The Community Of Artists "
            description="here you can see and post art card"
          />
          <p className="text-center">
            * To see all data delete your search input
          </p>
          {!user && (
            <div className="row ">
              <div className="col-12 text-center">
                <p>Hello</p>
                <p>to see and post in commuinty you have must to singup</p>
                <p>to singup</p>
                <Link to="/user/signup">Click Here</Link>
                <p className="mt-2">if you already registered</p>
                <Link to="/user/signin">Click Here</Link>
              </div>
            </div>
          )}

          {user && (
            <div className="mt-3">
              <SearchBar
                onSearchTextChange={(val) => {
                  this.onSearchChange(val);
                }}
                onSearchButtonClick={(val) => {
                  this.onSearchClick(val);
                }}
              />
            </div>
          )}

          {user && (
            <div className="row">
              {!searchX &&
                cards
                  .map((card) => {
                    return (
                      <AllCards
                        key={card._id}
                        card={card}
                        onLike={this.onLike}
                      />
                    );
                  })
                  .sort(function (a, b) {
                    const dateA = a.props.card.date;
                    const dateB = b.props.card.date;
                    return new Date(dateB) - new Date(dateA);
                  })}

              {searchX &&
                searchCard.map((cardRes) => {
                  return (
                    <AllCards
                      key={cardRes._id}
                      card={cardRes}
                      onLike={this.onLike}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </SimpleReactLightbox>
    );
  }
}

export default Home;
