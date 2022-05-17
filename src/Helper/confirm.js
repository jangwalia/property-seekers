import { useState,useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { updateDoc, doc ,collection,getDocs, query,where,orderBy,deleteDoc} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";


export default function Confirm({id}) {
  const [listings,setListings] = useState(null)
  const onDelete = async (id) =>{
    await deleteDoc(doc(db,'listings',id))
    const updatedListings = listings.filter((listing)=>
      listing.id !== id
    )
    setListings(updatedListings)
    toast.success('Successfully Deleted Listing')
  }

  return (
    <>
    <div class="alert alert-success" role="alert">
      <h4 class="alert-heading">Are You sure you want to delete this listing?</h4>
      <button type="button" class="btn btn-outline-danger" onClick={ ()=>onDelete(id)}>Delete</button>
      
    </div>
    </>
    
  );
}