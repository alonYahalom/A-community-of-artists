import React from "react";
import { Link } from "react-router-dom";
import ReadMoreReact from "read-more-react";
import "./card.css";
import { SRLWrapper } from "simple-react-lightbox";
import Moment from "moment";

const Card = ({ card, deleteCard }) => {
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
          <Link title="Edit Card" to={`/my-gallery/edit/${card._id}`}>
            <i className="far fa-edit"></i>
          </Link>
          <Link
            onClick={(e) => deleteCard(e, card._id)}
            to=""
            className="ml-2 text-danger"
            title="Delete Card"
          >
            <i className="fas fa-trash-alt"></i>
          </Link>

          {/* <Link to="/my-cards">
            <i
              className="fas fa-share-alt text-muted float-right p-1 my-1"
              onClick={() => {}}
              data-toggle="tooltip"
              data-placement="top"
              title="Share this post"
            ></i>
          </Link> */}
        </p>
      </div>
    </div>
  );
};

export default Card;
