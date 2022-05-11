import React, { useState,useEffect,useRef, useId } from 'react'
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './CreateListing.css'

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
    images : {},
    latitude : 0,
    longitude : 0
  })
  //destructuring states
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData
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
//onSubmit function
const onSubmit = async e =>{
  e.preventDefault()
  //make sure discounted price is less then regular price
  if(discountedPrice >= regularPrice){
    toast.error('Discounted Price should be less then regular price')
    return
  }
  if(images.length > 6){
    toast.error('Maximum limit of uploading images is 6')
    return
  }
  //use Geocode API
  let geoLocation = {}
  let location
  let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE}`)
  const data = await response.json()
  geoLocation.lat = data.results[0]?.geometry.location.lat ?? 0
  geoLocation.lng = data.results[0]?.geometry.location.lng ?? 0
  location = data.status === 'ZERO_RESULTS' ? undefined : data.results[0]?.formatted_address
  if(location === undefined || location.includes('undefined')){
    toast.error('Incorrect Location Address')
    return
  }
}
//input onChange value
const onChange = e =>{
  //this will trigger each time we change any input field
  let change = null
  if(e.target.value === 'true'){
    change = true;
  }
  if(e.target.value === 'false'){
    change = false;
  }
  //handle files
  if(e.target.files){
    setFormaData((prevState) => ({
      ...prevState,
      images : e.target.files
    }))
  }
  if(!e.target.files){
    setFormaData((prevState) =>({
      ...prevState,
    [e.target.id] : change ?? e.target.value
    }))
  } 
}
<<<<<<< HEAD
// const onTesting = ()=>{
//   console.log("hello")
// }
return (
  <div className='profile'>
  <header>
    <p className='pageHeader'>Create a Listing</p>
  </header>
  <main>
    <form onSubmit={onSubmit}>
      <label className='formLabel'>Sell / Rent</label>
      <div className='formButtons'>
        <button
          type='button'
          className={type === 'sale' ? 'formButtonActive' : 'formButton'}
          id='type'
          value='sale'
          onClick={onChange}
        >
          Sell
        </button>
        <button
          type='button'
          className={type === 'rent' ? 'formButtonActive' : 'formButton'}
          id='type'
          value='rent'
          onClick={onChange}
        >
          Rent
        </button>
      </div>
      <label className='formLabel'>Name</label>
      <input
        className='formInputName'
        type='text'
        id='name'
        value={name}
        onChange={onChange}
        maxLength='32'
        minLength='10'
        required
      />
      <div className='formRooms flex'>
        <div>
          <label className='formLabel'>Bedrooms</label>
          <input
            className='formInputSmall'
            type='number'
            id='bedrooms'
            value={bedrooms}
            onChange={onChange}
            min='1'
            max='50'
            required
          />
=======
  return (
    <div className='profile'>
    <header className='profile'>
      <p className='pageHeader'>Create a Listing</p>
    </header>
      <form onSubmit={onSubmit} className="profile">
        <label className='formLabel'>Sell / Rent</label>
        <div className='formButtons'>
          <button
            type='button'
            className={type === 'sale' ? 'formButtonActive' : 'formButton'}
            id='type'
            value='sale'
            onClick={onChange}
          >
            Sell
          </button>
          <button
            type='button'
            className={type === 'rent' ? 'formButtonActive' : 'formButton'}
            id='type'
            value='rent'
            onClick={onChange}
          >
            Rent
          </button>
>>>>>>> cc853d7974b68f55a2146b0a20f13d3dc96a7da3
        </div>
        <div>
          <label className='formLabel'>Bathrooms</label>
          <input
            className='formInputSmall'
            type='number'
            id='bathrooms'
            value={bathrooms}
            onChange={onChange}
            min='1'
            max='50'
            required
          />
        </div>
      </div>
      <label className='formLabel'>Parking spot</label>
        <div className='formButtons'>
          <button
            className={parking ? 'formButtonActive' : 'formButton'}
            type='button'
            id='parking'
            value={true}
            onClick={onChange}
            min='1'
            max='50'
          >
            Yes
          </button>
          <button
            className={
              !parking && parking !== null ? 'formButtonActive' : 'formButton'
            }
            type='button'
            id='parking'
            value={false}
            onClick={onChange}
          >
            No
          </button>
        </div>
        <label className='formLabel'>Furnished</label>
        <div className='formButtons'>
          <button
            className={furnished ? 'formButtonActive' : 'formButton'}
            type='button'
            id='furnished'
            value={true}
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={
              !furnished && furnished !== null
                ? 'formButtonActive'
                : 'formButton'
            }
            type='button'
            id='furnished'
            value={false}
            onClick={onChange}
          >
            No
          </button>
        </div>
        <label className='formLabel'>Address</label>
        <textarea
          className='formInputAddress'
          type='text'
          id='address'
          value={address}
          onChange={onChange}
          required
        />
        {!geoLocation && (
          <div className='formLatLng flex'>
            <div>
              <label className='formLabel'>Latitude</label>
              <input
                className='formInputSmall'
                type='number'
                id='latitude'
                value={latitude}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label className='formLabel'>Longitude</label>
              <input
                className='formInputSmall'
                type='number'
                id='longitude'
                value={longitude}
                onChange={onChange}
                required
              />
            </div>
          </div>
        )}
        <label className='formLabel'>Offer</label>
        <div className='formButtons'>
          <button
            className={offer ? 'formButtonActive' : 'formButton'}
            type='button'
            id='offer'
            value={true}
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={
              !offer && offer !== null ? 'formButtonActive' : 'formButton'
            }
            type='button'
            id='offer'
            value={false}
            onClick={onChange}
          >
            No
          </button>
        </div>
        <label className='formLabel'>Regular Price</label>
        <div className='formPriceDiv'>
          <input
            className='formInputSmall'
            type='number'
            id='regularPrice'
            value={regularPrice}
            onChange={onChange}
            min='50'
            max='750000000'
            required
          />
          {type === 'rent' && <p className='formPriceText'>$ / Month</p>}
        </div>
        {offer && (
          <>
            <label className='formLabel'>Discounted Price</label>
            <input
              className='formInputSmall'
              type='number'
              id='discountedPrice'
              value={discountedPrice}
              onChange={onChange}
              min='50'
              max='750000000'
              required={offer}
            />
          </>
        )}
        <label className='formLabel'>Images</label>
        <p className='imagesInfo'>
          The first image will be the cover (max 6).
        </p>
        <input
          className='formInputFile'
          type='file'
          id='images'
          onChange={onChange}
          max='6'
          accept='.jpg,.png,.jpeg'
          multiple
          required
        />
        <button type='submit' className='primaryButton createListingButton'>
          Create Listing
        </button>
      </form>
  </div>
  )
}