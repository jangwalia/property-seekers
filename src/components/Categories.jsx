import Property from "./Property";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import './Categories.css'

export default function Categories() {
  const [listing, setListing] = useState(null);
  const [lastListing,setLastListing]= useState(null)
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        //const listingRef = collection(db,'listings')
        const listingRef = collection(db, "listings");
        //create a query
        const q = query(
          listingRef,
          where("type", "==", params.categoryname),
          orderBy("timestamp", "desc"),
          limit(6)
        );
        //we will get result

        const queryResult = await getDocs(q);
        const lastVisibleListing = queryResult.docs[queryResult.docs.length - 1]
        setLastListing(lastVisibleListing)
        let properties = [];
        queryResult.forEach((element) => {
          return properties.push({
            id: element.id,
            data: element.data(),
          });
        });
        setListing(properties);
        setLoading(false);
      } catch (error) {
        toast.error("No Listing to show");
      }
    };
    fetchListing();
  }, [params.categoryname]);
// Load More
const onFetchLoadMore = async () => {
  try {
    //const listingRef = collection(db,'listings')
    const listingRef = collection(db, "listings");
    //create a query
    const q = query(
      listingRef,
      where("type", "==", params.categoryname),
      orderBy("timestamp", "desc"),
      limit(6),
      startAfter(lastListing)
    );
    //we will get result

    const queryResult = await getDocs(q);
    const lastVisibleListing = queryResult.docs[queryResult.docs.length - 1]
    setLastListing(lastVisibleListing)
    let properties = [];
    queryResult.forEach((element) => {
      return properties.push({
        id: element.id,
        data: element.data(),
      });
    });
    setListing((prevState)=>[...prevState,...properties]);
    setLoading(false);
  } catch (error) {
    toast.error("No Listing to show");
  }
};
  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryname === "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
        <main className='fileterData'>
     <div>
     <label>Bedrooms</label>
        <select id = 'bedrooms'  className="form-select">
        <option value='1'>1</option>
        <option value="2">2</option>
        <option value="3">3+</option>
      </select>
    </div>
    <div>
    <label>Bathrooms</label>
        <select id = 'bathrooms' className="form-select">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3+</option>
      </select>
    </div>
    
    </main>
      </header>
      {!loading && listing.length > 0 ? (
        <>
          <main className="wrapper categoryListing shadow-lg p-8 mb-5 rounded">
            {/* <ul className="categoryListings"> */}
              {listing.map((property) => (
                <Property
                  key={property.id}
                  listingInfo={property.data}
                  id={property.id}
                />
              ))}
            {/* </ul> */}
          </main>
          <br/>
          <br/>
          {lastListing &&(
            <p className="loadMore" onClick = {onFetchLoadMore}>Load More</p>
          )}

        </>
      ) : (
        <p>'No Listing for {params.categoryname}'</p>
      )}
    </div>
  );
}