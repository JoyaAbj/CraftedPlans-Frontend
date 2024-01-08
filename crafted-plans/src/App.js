
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Contact from './HomePage/Contact';
import Footer from './HomePage/Footer';
import NavBar from './HomePage/NavBar';
import Gallery from './HomePage/Gallery';

function App() {
  return (
   <div>
    <Router>
      <Routes>
      <Route path="/" element={ <> <NavBar/><Gallery/><Footer/> </>} />
      <Route path="/contact" element={ <> <Contact/> </>} />

      </Routes>
    </Router>

   </div>
  );
}

export default App;
