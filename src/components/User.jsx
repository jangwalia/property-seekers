import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import rightArrow from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import Spinner from "./Spinner";
import Property from "./Property";
import Confirm from "../Helper/confirm";
import "./User.css";

export default function User() {
  //initiante getauth to get current user
  const auth = getAuth();
  //use formdata to remain consistent with other routes
  const [formdata, setFormdata] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  //state to change user settings
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [changeDetails, setChangedetails] = useState(false);
  //destructure the name and email
  const { name, email } = formdata;
  //initiate useNavigate hook
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const queryResult = await getDocs(q);
      let listings = [];
      queryResult.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);
  const onlogout = () => {
    // use firebase inbuilt signout button
    auth.signOut();
    navigate("/");
    return;
  };
  //handle changeDetails through onSubmit
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update the user in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error("Cannot change details");
    }
  };
  //onChange
  const onChange = (e) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // onDelete function
  const onDelete = async (listingID) => {
    if (window.confirm("Are you sure you want to delete this listing ?")) {
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success("Successfully Deleted Listing");
    }
  };
  const showConfirm = (id) => {
    return <Confirm id={id} />;
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="userProfile shadow-lg p-8 mb-5 rounded">
        <header className="profileHeader">
          <p className="pageHeader">My Profile</p>
          <button type="button" className="logOut" onClick={onlogout}>
            Logout
          </button>
        </header>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">My Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangedetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "Done" : "change"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type="text"
              id="email"
              className="profileEmail"
              disabled
              value={email}
            />
          </form>
        </div>
        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="home" />
          <p>Sell Or Rent Property</p>
          <img src={rightArrow} alt="property" />
        </Link>
      </div>
      {/* users listing details */}
      {!loading && listings.length > 0 && (
        <>
          <p className="listingText">Your Listings</p>
          <div className="listingsList shadow-lg p-8 mb-5 rounded">
            {/* <ul className="wrapper listingsList"> */}
            {listings.map((listing) => (
              <Property
                key={listing.id}
                listingInfo={listing.data}
                onDelete={() => {
                  onDelete(listing.id);
                }}
              />
            ))}
          </div>
          {/* </ul> */}
        </>
      )}
    </div>
  );
}
