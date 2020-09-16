import React from "react";
import { SRLWrapper } from "simple-react-lightbox";
import Moment from "moment";
import ReadMoreReact from "read-more-react";
import { Link } from "react-router-dom";
import "./all-cards.css";

const FavCards = ({ card, onUnLike }) => {
  return (
    <div className=" col-md-6 col-lg-4 mt-3 box shadow-sm p-3 mb-5 bg-white rounded">
      <div className="card-header">
        <h4 className="card-title font-weight-bold mb-2">{card.title}</h4>
        <p className="card-text">
          <i className="far fa-clock pr-2"></i>
          <small> {Moment(card.date).format("MMM Do YY")}</small>
        </p>
      </div>
      <div id="id_image">
        <SRLWrapper>
          <img
            className="card-img-top rounded-0"
            src={card.image}
            alt=""
            width="100"
            height="270"
          />
        </SRLWrapper>
      </div>
      <div className="card-body ">
        <span id="id_description">
          <ReadMoreReact
            text={card.description}
            min={20}
            ideal={47}
            max={200}
            readMoreText="Read More.."
          />
        </span>
        <p className="card-text border-top pt-2">
          <b>Tel: </b>
          {card.phone} <br />
        </p>

        <p className="card-text border-top pt-2">
          <Link to="/home">
            <i
              onClick={(e) => onUnLike(e, card)}
              style={{ color: "grey" }}
              className="fas fa-heart-broken float-right p-1 my-1 mr-3"
              data-toggle="tooltip"
              data-placement="top"
              title="unlike"
            ></i>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FavCards;
