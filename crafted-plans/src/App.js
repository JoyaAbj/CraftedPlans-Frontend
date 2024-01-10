
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Contact from './HomePage/Contact';
import Footer from './HomePage/Footer';
import NavBar from './HomePage/NavBar';
import Header from './HomePage/Header';
import ProductsHomePage from './HomePage/ProductsHomePage';
import Advantages from './HomePage/Advantages';
import Gallery from './HomePage/Gallery';
import About from './HomePage/About';
import Banner from './HomePage/Banner';
import Accessories from './HomePage/Accessories';
import ProductAccessories from './HomePage/ProductAccessories';
import './Styles/style.css';

function App() {
  return (
   <div>
    <Router>
      <Routes>
      <Route path="/" element={ <> <NavBar/><ProductsHomePage/><About/><Banner/><Advantages/> </>} />
      <Route path="/contact" element={ <> <Contact/> </>} />


      <Route path="/accessories" element={ <> <Accessories/> </>} />
      <Route path="/productAccessories" element={ <> <ProductAccessories/> </>} />

      </Routes>
    </Router>

   </div>
  );
}

export default App;
