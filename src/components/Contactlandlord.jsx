import { useState,useEffect } from "react"
import { useParams,useSearchParams } from "react-router-dom"
import {doc,getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { toast} from "react-toastify"
import './ContactLandlord.css'
export default function Contactlandlord() {
  const [message,setMessage]= useState('')
  const [landLord,setLandLord]  = useState(null)
  const [searchParams,setSearchParams] = useSearchParams()
  const params = useParams()
  useEffect(()=>{
    const getlandLord = async ()=>{
      const docRef = doc(db,'users',params.landLordID)
      const docResult = await getDoc(docRef)
      if(docResult.exists()){
        setLandLord(docResult.data())
      }else{
        toast.error('cannot get landlord data')
      }
    }
    getlandLord()
  },[params.landLordID])
  const onChange = (e)=>{
    setMessage(e.target.value)
  }
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">
          Contact Landlord
        </p>
      </header>
      {landLord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {landLord?.name}</p>
          </div>
          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">Message</label>
              <textarea name="message" id="message" value ={message} onChange={onChange} className="textarea"></textarea>
            </div>
            <a href={`mailto:${landLord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
              <button type="button" className="primaryButton">Send Message</button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}
