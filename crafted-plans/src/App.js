
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Styles/style.css'
import Contact from './HomePage/Contact';
import Footer from './HomePage/Footer';
import NavBar from './HomePage/NavBar';
import Header from './HomePage/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Hero from './HomePage/Hero';
import ProductsHomePage from './HomePage/ProductsHomePage';
import Advantages from './HomePage/Advantages';
import Gallery from './HomePage/Gallery';
import About from './HomePage/About';
import Banner from './HomePage/Banner';
import NotePads from './HomePage/NotePads';
import NotepadProduct from './HomePage/NotepadProduct';
import Accessories from './HomePage/Accessories';
import ProductAccessories from './HomePage/ProductAccessories';
import PageNotFound from './HomePage/PageNotFound';
import TopBar from './Planner/TopBar';
import Login from './HomePage/Login';
import Testimonials from './HomePage/Testimonials';
import { Toaster } from 'react-hot-toast';
import Cart from './HomePage/Cart';
import './Styles/style.css';
import SideBar from './Dashboard/SideBar';
import {getUserRole} from './HomePage/GetData';

function App() {
  const role =getUserRole();
  return (
   <div>
    <Router>
      <Toaster toastOptions={{ duration: 5000 }} />
      <Routes>
      <Route path="/" element={ <> <NavBar/><Hero/><ProductsHomePage/><About/><Banner/><Testimonials/><Gallery/><Advantages/> <Footer/> </>} />
      <Route path="/contact" element={ <> <Contact/> </>} />
      <Route path="/notepads" element={ <> <NotePads/> </>} />
      <Route path="/notepadProduct/:Id" element={ role === 'customer'? <NotepadProduct/> : <PageNotFound/>} />
      <Route path="/accessories" element={ <> <Accessories/> </>} />
      <Route path="/productAccessories/:Id" element={role === 'customer'?  <ProductAccessories/> : <PageNotFound/> } />
      <Route path="/login" element={<> <Login/> </>} />
      <Route path="/planners" element={ role === 'customer' ? <TopBar/> : <Login/>} />
      <Route path="/cart" element={role === 'customer' ?<Cart /> : <PageNotFound/>} />
      <Route path="/dashboard" element={role === 'admin'? <SideBar/> : <Login/>} /> 
      <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Router>

   </div>
  );
}

export default App;
