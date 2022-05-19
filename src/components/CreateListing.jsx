import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Spinner from "./Spinner";
import createListingIcon from "../assets/svg/createListingIcon.png"
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "./CreateListing.css";

export default function CreateListing() {
  // eslint-disable-next-line
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regulerPrice: 0,
    discountedPrice: 0,
    images: {},
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regulerPrice,
    discountedPrice,
    images,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (discountedPrice >= regulerPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }

    if (images.length > 6) {
      setLoading(false);
      toast.error("Max 6 images");
      return;
    }

    let geolocation = {};
    let location;

    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE}`
      );

      const data = await response.json();
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;
      console.log(geolocation.lat);
      location =
        data.status === "ZERO_RESULTS"
          ? undefined
          : data.results[0]?.formatted_address;

      if (location === undefined || location.includes("undefined")) {
        setLoading(false);
        toast.error("Please enter a correct address");
        return;
      }
    }

    // Store image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      console.log(error)
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imageUrls,
      geolocation,
      timestamp: serverTimestamp(),
    };

    formDataCopy.location = address;
    delete formDataCopy.images;
    delete formDataCopy.address;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listing saved");
    navigate(`/categories/${formDataCopy.type}/${docRef.id}`);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };
  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="listingForm shadow-lg p-8 mb-5 rounded">
        <div className="listingTitle">
          <img src={createListingIcon} className="listingIcon"/>
          <p>Create a Listing</p>
        </div>
        <form
          onSubmit={onSubmit}
         className="listingCreateForm"
        >
          <div className="cols">
            <div className="form-group">
              <label className="formLabel">Sell / Rent</label>
              <div className="formButtons">
                <button
                  type="button"
                  className={
                    type === "sale" ? "formButtonActive" : "formButton"
                  }
                  id="type"
                  value="sale"
                  onClick={onMutate}
                >
                  Sell
                </button>
                <button
                  type="button"
                  className={
                    type === "rent" ? "formButtonActive" : "formButton"
                  }
                  id="type"
                  value="rent"
                  onClick={onMutate}
                >
                  Rent
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="formLabel">Name</label>
              <input
                className="formInputName"
                type="text"
                id="name"
                value={name}
                onChange={onMutate}
                maxLength="32"
                minLength="10"
                required
              />
            </div>
            <div className="formRooms flex form-group">
              <div>
                <label className="formLabel">Bedrooms</label>
                <input
                  className="formInputSmall"
                  type="number"
                  id="bedrooms"
                  value={bedrooms}
                  onChange={onMutate}
                  min="1"
                  max="50"
                  required
                />
              </div>
              <div>
                <label className="formLabel">Bathrooms</label>
                <input
                  className="formInputSmall"
                  type="number"
                  id="bathrooms"
                  value={bathrooms}
                  onChange={onMutate}
                  min="1"
                  max="50"
                  required
                />
              </div>
            </div>
          </div>
          <div className="cols">
            <div className="form-group">
              <label className="formLabel">Parking spot</label>
              <div className="formButtons">
                <button
                  className={parking ? "formButtonActive" : "formButton"}
                  type="button"
                  id="parking"
                  value={true}
                  onClick={onMutate}
                  min="1"
                  max="50"
                >
                  Yes
                </button>
                <button
                  className={
                    !parking && parking !== null
                      ? "formButtonActive"
                      : "formButton"
                  }
                  type="button"
                  id="parking"
                  value={false}
                  onClick={onMutate}
                >
                  No
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="formLabel">Furnished</label>
              <div className="formButtons">
                <button
                  className={furnished ? "formButtonActive" : "formButton"}
                  type="button"
                  id="furnished"
                  value={true}
                  onClick={onMutate}
                >
                  Yes
                </button>
                <button
                  className={
                    !furnished && furnished !== null
                      ? "formButtonActive"
                      : "formButton"
                  }
                  type="button"
                  id="furnished"
                  value={false}
                  onClick={onMutate}
                >
                  No
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="formLabel">Address</label>
              <textarea
                className="formInputAddress"
                type="text"
                id="address"
                value={address}
                onChange={onMutate}
                required
              />
            </div>
          </div>
          <div className="cols">
            <div className="form-group">
              <label className="formLabel">Offer</label>
              <div className="formButtons">
                <button
                  className={offer ? "formButtonActive" : "formButton"}
                  type="button"
                  id="offer"
                  value={true}
                  onClick={onMutate}
                >
                  Yes
                </button>
                <button
                  className={
                    !offer && offer !== null ? "formButtonActive" : "formButton"
                  }
                  type="button"
                  id="offer"
                  value={false}
                  onClick={onMutate}
                >
                  No
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="formLabel">Regular Price</label>
              <div className="formPriceDiv">
                <input
                  className="formInputSmall"
                  type="number"
                  id="regulerPrice"
                  value={regulerPrice}
                  onChange={onMutate}
                  min="50"
                  max="750000000"
                  required
                />
                {type === "rent" && <p className="formPriceText">$ / Month</p>}
              </div>

              {offer && (
                <>
                  <label className="formLabel">Discounted Price</label>
                  <input
                    className="formInputSmall"
                    type="number"
                    id="discountedPrice"
                    value={discountedPrice}
                    onChange={onMutate}
                    min="50"
                    max="750000000"
                    required={offer}
                  />
                </>
              )}
            </div>
            <div className="form-group">
              <label className="formLabel">Images</label>
              <p className="imagesInfo">
                The first image will be the cover (max 6).
              </p>
              <input
                className="formInputFile"
                type="file"
                id="images"
                onChange={onMutate}
                max="6"
                accept=".jpg,.png,.jpeg"
                multiple
                required
              />
            </div>
          </div>
          <button type="submit" className="primaryButton createListingButton">
          Create Listing
        </button>
        </form>
       
      </div>
    </div>
  );
}
