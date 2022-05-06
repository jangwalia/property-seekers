//CREATE CATEGORY COMPONENT****
//JUST PUT SIMPLE TEXT IN CATEGORY
//IN APP.JSX IMPORT CATEGORY COMPONENT
//IN THE ROUTES 
//<Route path='/category/:categoryname' element={<Category />} />
//In the Category component
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

 export default function Categories(){
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
          where('type','==',params.categoryname),
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
  },[params.categoryname])

  return <div className="category">
    <header>
      <p className="pageHeader">
        {params.categoryname === 'rent' ? 'Places for rent' : 'places for sale'}
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
    
    </> : <p>'No Listing for {params.categoryname}'</p>}
  </div>


}