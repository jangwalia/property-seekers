import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import {collection,getDocs,query,orderBy,limit} from 'firebase/firestore'
import {db} from '../firebase.config'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import Spinner from "./Spinner";
SwiperCore.use([Navigation,Pagination,Scrollbar,A11y])
export default function Homeslider() {
  const [loading,setLoading] = useState(true)
  const [listings,setListings] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchListings = async ()=>{
      const listingsRef = collection(db,'listings')
      const q = query(listingsRef,orderBy('timestamp','desc'),
      limit(5))
      const querySnap = await getDocs(q)
      let listings = []
      querySnap.forEach((doc)=>{
        return listings.push({
          id:doc.id,
          data:doc.data()
        })
      })
      setListings(listings)
      setLoading(false)
    }
   fetchListings()
  },[])
  if(loading){
    return <Spinner/>
  }
  return (
    listings && (
      <>
      <p className="exploreHeading">Featured Listings</p>
      <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
       slidesPerView = {1} 
       pagination = {{clickable: true}}>
        {listings.map(({data,id}) =>(
          <SwiperSlide key={id} 
          onClick={()=>navigate(`/categories/${data.type}/${id}`)}
          style = {{background : `url(${data.imageUrls[0]})
          center no-repeat`,
          backgroundSize: 'cover',
          height:'400px'
        }}>

          </SwiperSlide>
        ))}
      </Swiper>
      </>
     

    )
  )
}
