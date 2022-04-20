import { useNavigate, useLocation } from "react-router-dom"
import { ReactComponent as  OfferIcon} from "../assets/svg/localOfferIcon.svg"
import { ReactComponent as  ExploreIcon} from "../assets/svg/exploreIcon.svg"
import { ReactComponent as  PersonOutlineIcon} from "../assets/svg/personOutlineIcon.svg"

export default function Navbar() {
  //initialize navigate hook
  const navigate = useNavigate()
  const location = useLocation()
  //change color for the page we are in
  const checkpage = (route) =>{
    if(location.pathname === route){
      return true
    }

  }
  return (
    <footer className="navbar">
    <nav className="navbarNav">
      <ul className="navbarListItems">
        <li className="navbarListItem" onClick={()=>navigate('/')}>
        <ExploreIcon fill={checkpage('/') ? "black" : "#ccd5ae"} width='36px' height='36px' />
        <p className={checkpage('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p>
        </li>
        <li className="navbarListItem" onClick={()=>navigate('/offers')}>
        <OfferIcon fill={checkpage('/offers') ? "black" : "#ccd5ae"}  width='36px' height='36px' />
        <p className={checkpage('/offers') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Offers</p>
        </li>
        <li className="navbarListItem" onClick={()=>navigate('/user')}>
        <PersonOutlineIcon fill={checkpage('/user') ? "black" : "#ccd5ae"}  width='36px' height='36px' />
        <p className={checkpage('/user') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</p>
        </li>
      </ul>
    </nav>
      
    </footer>
  )
}
