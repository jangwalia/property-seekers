import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import shareIcon from "../assets/svg/shareIcon.svg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Listing.css";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();
  //fetch the listing from database
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingID);
      const docResult = await getDoc(docRef);
      if (docResult.exists()) {
        setListing(docResult.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [navigate, params.listingID]);
  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {listing.imageUrls.map((url, index) => (
          <SwiperSlide
            key={index}
            style={{
              background: `url(${listing.imageUrls[index]})
          center no-repeat`,
              backgroundSize: "cover",
              height: "600px",
            }}
          ></SwiperSlide>
        ))}
      </Swiper>
      {/* share link which user can send to someone */}
      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLink(true);
          setTimeout(() => {
            setShareLink(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="share" />
      </div>
      {shareLink && <p className="linkCopied">Link Copied!</p>}

      {/*   Listing deatils */}
      <div className="listingDetails">
        <p className="listingName">
          {listing.name}-$
          {listing.offer ? listing.discountedPrice : listing.regulerPrice}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === "rent" ? "Rent" : "Sale"}
        </p>
        {listing.offer && (
          <p className="discountedPrice">
            ${listing.regulerPrice - listing.discountedPrice} discount
          </p>
        )}
        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : "1 Bedroom"}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : "1 Bathroom"}
          </li>
          <li>{listing.parking && "Parking Spot Provided"}</li>
          <li>{listing.furnished && "Furnished"}</li>
        </ul>

        <p className="listingLocationTitle">Location</p>
        <div className="leafletContainer">
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>

        <p className="listingLocationTitle">Location</p>
        {/* map here */}

        {/*CONTACT LANDORD IF LISTING OWNER IS NOT THE USER */}
        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className="primaryButton"
          >
            Contact LandLord
          </Link>
        )}
      </div>
    </main>
  );
}
