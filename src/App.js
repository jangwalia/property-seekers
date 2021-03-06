import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Explore from './components/Explore';
import Forgotpassword from './components/Forgotpassword';
import Login from './components/Login';
import Signin from './components/Signin';
import Navbar from './components/Navbar';
import User from './components/User';
import Categories from './components/Categories';
import Offer from './components/Offer';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateListing from './components/CreateListing';
import Listing from './components/Listing';
import Contactlandlord from './components/Contactlandlord';
import Filterdata from './components/Filterdata';
// import background from "./assets/background/background.jpg"

function App() {
  return (
    <div className="App" >
     <Router>
     <Navbar/>

       <Routes>
         <Route path = '/' element={<Explore/>}/>
         <Route path = '/user' element={<PrivateRoute />}>
          <Route path = '/user' element={<User/>}/>
         </Route>
         <Route path='/categories/:categoryname' element={<Categories />}/>
         <Route path='/user' element={<User />} />
         <Route path = '/signup' element={<Signin/>}/>
         <Route path = '/login' element={<Login/>}/>
         <Route path = '/forgotPassword' element={<Forgotpassword/>}/>
         <Route path = '/offers' element={<Offer/>}/>
         <Route path = '/create-listing' element={<CreateListing/>}/>
         <Route path='/categories/:categoryname/:listingID' element={<Listing/>}/>
         <Route path='/contact/:landLordID' element={<Contactlandlord/>}/>
         <Route path='/filterData/:bedrooms/:bathrooms' element={<Filterdata/>}/>
       </Routes>
     </Router>
     <ToastContainer/>
    </div>
  );
}
export default App;