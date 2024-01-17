
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
import './Styles/style.css';
import Login from './HomePage/Login';

function App() {
  return (
   <div>
    <Router>
      <Routes>
      <Route path="/" element={ <> <NavBar/><Hero/><ProductsHomePage/><About/><Banner/><Gallery/><Advantages/> <Footer/> </>} />
      <Route path="/contact" element={ <> <Contact/> </>} />
      <Route path="/notepads" element={ <> <NotePads/> </>} />
      <Route path="/notepadProduct/:Id" element={ <> <NotepadProduct/> </>} />
      <Route path="/accessories" element={ <> <Accessories/> </>} />
      <Route path="/productAccessories/:Id" element={ <> <ProductAccessories/> </>} />
      <Route path="/login" element={<> <Login/> </>} />
      <Route path="/planners" element={ <> <TopBar/> </>} />
      <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Router>

   </div>
  );
}

export default App;
