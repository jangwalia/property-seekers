import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import shareIcon from "../assets/svg/shareIcon.svg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./Listing.css";
import { async } from "@firebase/util";

export default function Listing() {
  const [listing, setListing] = useState('')
  const [shareLink, setShareLink] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

 useEffect(()=>{
   const fetchListing = async ()=>{
    const docRef = doc(db, 'listings',params.listingID)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      setListing(docSnap.data())
    }
   }
   fetchListing()
 },[navigate,params.listingID])


  return (
    
    <main>
      
      {/*slideshow */}
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
            //center={[]}
            zoom={13}
            scrollWheelZoom={false}
          ></MapContainer>
        </div> 
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
  
  )
}
