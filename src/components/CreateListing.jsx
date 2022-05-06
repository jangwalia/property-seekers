import React, { useState,useEffect,useRef, useId } from 'react'
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function CreateListing() {
  const [geoLocation,setGeoLocation] = useState(true)
  const [formData,setFormaData] = useState({
    type : 'rent',
    name : '',
    bedrooms : 1,
    bathrooms : 1,
    parking : false,
    furnished: false,
    address : '',
    offers : false,
    regularPrice : 0,
    discountedPrice : 0,
    image : {},
    latitude : 0,
    longitude : 0

  })
  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)
  useEffect(()=>{
    if(isMounted){
      onAuthStateChanged(auth,(user)=>{
        if(user){
          setFormaData({...formData,userRef : user.uid})
        }else{
          navigate('/login')
        }
      })
    }
    return ()=>{
      isMounted.current = false
    }
  },[isMounted])

  return (
    <div>
      create
    </div>
  )
}
