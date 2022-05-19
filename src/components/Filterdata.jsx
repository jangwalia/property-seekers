import {useState} from 'react'
import Categories from './Categories'
import './Filterdata.css'
export default function Filterdata() {
 const[filterdata,setFilterData] = useState({
   bedrooms : 1,
   bathrooms : 1
 })
 const {bedrooms,bathrooms} = filterdata
  const handleChange = (e) =>{
    setFilterData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  return (
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
   
  )
}
