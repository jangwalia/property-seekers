import Property from './Property';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import './Categories.css'

 export default function Offer(){
  const [listing,setListing] = useState(null)
  const[loading,setLoading] = useState(true)
  const params = useParams()
  useEffect(()=>{
    const fetchListing = async ()=>{
     
      try {
        //const listingRef = collection(db,'listings')
        const listingRef = collection(db,'listings')
        //create a query
        const q = query(
          listingRef,
          where('offer','==',true),
          orderBy('timestamp','desc'),
          limit(10)
          )
        //we will get result

        const queryResult = await getDocs(q)
        let properties = []
        queryResult.forEach((element) => {
            return properties.push({
            id : element.id,
            data : element.data()
          })
       })
      setListing(properties)
      setLoading(false)
      } catch (error) {
        toast.error('No Listing to show')
       
      }

    }
    fetchListing()
  },[])

  return <div className="category">
    <header>
      <p className="pageHeader">
        Hot Deals Waiting For You!
      </p>
    </header>
    {!loading && listing.length > 0 ? <>
    <main>
      <ul className='categoryListings'>
        {listing.map((property)=>(
          <Property
          key = {property.id}
          listingInfo={property.data}
          id = {property.id}
          />
        ))}
      </ul>
    </main>
    
    </> : <p>No offers available.</p>}
  </div>


}