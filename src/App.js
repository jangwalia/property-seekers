import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Explore from './components/Explore';
import Forgotpassword from './components/Forgotpassword';
import Login from './components/Login';
import Signin from './components/Signin';
import Navbar from './components/Navbar';
import User from './components/User';
import Categories from './components/Categories'
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (

    <div className="App">
     <Router>
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
       </Routes>
       <Navbar/>
     </Router>
     <ToastContainer/>
    </div>
  );
}
export default App;