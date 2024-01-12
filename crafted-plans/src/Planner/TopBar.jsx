import React, { useState } from 'react';
import '../Styles/planner.css';
import Cover from './Cover';
import Information from './Information';
import Events from './Events';
import Dates from './Dates';
import Pages from './Pages';
import AddOns from './AddOns';
import Review from './Review';
import NavBar from '../HomePage/NavBar';
import Footer from '../HomePage/Footer';

function App() {
  const [visibleCover, setCoverVisible] = useState(true);
  const [visibleInformation, setInformationVisible] = useState(false);
  const [visibleEvents, setEventsVisible] = useState(false);
  const [visibleDates, setDatesVisible] = useState(false);
  const [visiblePages, setPagesVisible] = useState(false);
  const [visibleAddOns, setAddOnsVisible] = useState(false);
  const [visibleReview, setReviewVisible] = useState(false);

  const handleSidebarClick = (section) => {
    setCoverVisible(section === 'cover');
    setInformationVisible(section === 'information');
    setEventsVisible(section === 'events');
    setDatesVisible(section === 'dates');
    setPagesVisible(section === 'pages');
    setAddOnsVisible(section === 'addOns');
    setReviewVisible(section === 'review');
  };
  return (
    <body>
      <NavBar/>
      <div className="sidebar">
      <div className="one-cover">
          <img src="/TopBar/cover.png" alt="" className="cover-png" />
        {visibleCover &&
        <div className="icons-top-bar"></div>
        }
        <a href="#" className='active' onClick={() => handleSidebarClick('cover')}>
          Cover
        </a>
        </div>
        <div className="one-cover">
          <img src="/TopBar/Information.png" alt="" className="cover-png" />
        {visibleInformation &&
        <div className="icons-top-bar"></div>
        }
        <a href="#"  onClick={() => handleSidebarClick('information')}>
          Information
        </a>
        </div>
        <div className="one-cover">
        <img src="/TopBar/cover.png" alt="" className="cover-png" />
        {visibleEvents &&
        <div className="icons-top-bar"></div>
        }
        <a href="#" onClick={() => handleSidebarClick('events')}>
          Events
        </a>
        </div>
        <div className="one-cover">
        <img src="/TopBar/cover.png" alt="" className="cover-png" />
        {visibleDates &&
        <div className="icons-top-bar"></div>
        }
        <a href="#" onClick={() => handleSidebarClick('dates')}>
          Dates
        </a>
        </div>
        <div className="one-cover">
        <img src="/TopBar/cover.png" alt="" className="cover-png" />
        {visiblePages && 
        <div className="icons-top-bar"></div>
        }
        <a href="#" onClick={() => handleSidebarClick('pages')}>
          Pages
        </a>
        </div>
        <div className="one-cover">
        <img src="/TopBar/cover.png" alt="" className="cover-png" />
        {visibleAddOns && 
        <div className="icons-top-bar"></div>
        }
        <a href="#" onClick={() => handleSidebarClick('addOns')}>
          Add Ons
        </a>
        </div>
        <div className="one-cover">
        <img src="/TopBar/cover.png" alt="" className="cover-png" />
        {visibleReview && 
        <div className="icons-top-bar"></div>
        }
        <a href="#" onClick={() => handleSidebarClick('review')}>
          Review
        </a>
        </div>
      </div>
      <div class="Content">
        {visibleCover && <Cover/>}
        {visibleInformation && <Information/>}
        {visibleEvents && <Events/>}
        {visibleDates && <Dates/>}
        {visiblePages && <Pages/>}
        {visibleAddOns && <AddOns/>}
        {visibleReview && <Review/>}
      </div>
      <Footer/>
    </body>
  );
}

export default App;