import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathIcon from "../assets/svg/bathtubIcon.svg";
import Confirm from "../Helper/confirm";
import "./Property.css";

export default function Property({ listingInfo, id, onDelete }) {
  // let regulerEx = '/\B(?=(\d{3})+(?!\d))/g'
  return (
    <div className="card-deck">
      <div className="card shadow-lg p-8 mb-5 rounded ">
        {/* <li className="categoryListing"> */}
          <Link
            to={`/categories/${listingInfo.type}/${id}`}
          >
            <img
              src={listingInfo.imageUrls[0]}
              alt="dataImg"
              className="categoryListingImg card-img-top"
            />
            <div className="categoryListingDetails card-body">
              <p className="categoryListingLocation">{listingInfo.location}</p>
              <p className="categoryListingname">{listingInfo.name}</p>
              <p className="categoryListingPrice">
                $
                {listingInfo.offer
                  ? listingInfo.discountedPrice
                  : listingInfo.regulerPrice}
                {listingInfo.type === "rent" && " /month"}
              </p>
              <div className="categoryListingInfoDiv">
                <img src={bedIcon} alt="" />
                <p className="categroryListingInfoText">
                  {listingInfo.bedrooms > 1
                    ? `${listingInfo.bedrooms} Bedrooms`
                    : `1 Bedroom`}
                </p>
                <img src={bathIcon} alt="" />
                <p className="categroryListingInfoText">
                  {listingInfo.bedrooms > 1
                    ? `${listingInfo.bathrooms} Bathrooms`
                    : `1 Bathrooms`}
                </p>
              </div>
            </div>
          </Link>
          {onDelete && (
            <DeleteIcon
              className="removeIcon" 
              width="5%" height="5%"
              fill="tomato"
              onClick={() => onDelete(listingInfo.id, listingInfo.name)}
            />
          )}
        {/* </li> */}
      </div>
    </div>
  );
}
