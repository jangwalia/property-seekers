import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Index from './components/Index'
import Forgotpassword from './components/Forgotpassword';
import Login from './components/Login';
import Offer from './components/Offer';
import Signin from './components/Signin';
import Navbar from './components/Navbar';
import User from './components/User'

function App() {
  return (
    <div className="App">
     <Router>
       <Routes>
         <Route path = '/' element={<Index/>}/>
         <Route path = '/offers' element={<Offer/>}/>
         <Route path = '/user' element={<User/>}/>
         <Route path = '/signup' element={<Signin/>}/>
         <Route path = '/login' element={<Login/>}/>
         <Route path = '/forgotpassword' element={<Forgotpassword/>}/>

       </Routes>
       <Navbar/>
     </Router>
    </div>
  );
}

export default App;
