
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Contact from './HomePage/Contact';
import Footer from './HomePage/Footer';
import NavBar from './HomePage/NavBar';
import Advantages from './HomePage/Advantages';
import Gallery from './HomePage/Gallery';
import About from './HomePage/About';

function App() {
  return (
   <div>
    <Router>
      <Routes>
      <Route path="/" element={ <> <NavBar/><About/><Gallery/><Advantages/><Footer/> </>} />
      <Route path="/contact" element={ <> <Contact/> </>} />

      </Routes>
    </Router>

   </div>
  );
}

export default App;
