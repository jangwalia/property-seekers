import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import {useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit
  
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Property from "./Property";
export default function Filterdata() {
  const [listing,setListing] = useState(null)
  const[loading,setLoading] = useState(true)
  const params = useParams()
  // const numBedroomParams = Number(params.bedrooms)
  // const numBathroomParams = Number(params.bathrooms)
  useEffect(() => {
    
    const fetchListing = async () => {
      try {
        //const listingRef = collection(db,'listings')
        const listingRef = collection(db, "listings");
        //create a query
        const q = query(
          listingRef,
          where("bedrooms", "==", params.bedrooms),
          where('bathrooms','==', params.bathrooms),
          orderBy("timestamp", "desc"),
          limit(6)
        );
        //we will get result

        const queryResult = await getDocs(q);
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
  }, []);

  if(loading){
  return <Spinner/>
  }


  return (
    <div>
    <p className="pageHeader" >Your Searched Results </p>
      {!loading && listing.length > 0 ? (
        <>
          <main>
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
          </>
      ) : (
        <p>No offers available.</p>
      )}
    </div>
  )
}
