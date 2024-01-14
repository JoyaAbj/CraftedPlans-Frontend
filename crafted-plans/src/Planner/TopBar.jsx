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
          <img src="/TopBar/cover.png" alt="cover" 
            className={`cover-png ${visibleCover ? '' : 'inactive-icon'}`} 
            />
        {visibleCover &&
        <div className="icons-top-bar"></div>
        }
        <a href="#" 
        className={`link-topBar ${visibleCover ? 'active1' : ''}`}
        onClick={() => handleSidebarClick('cover')}>
          Cover
        </a>
        </div>
        <div className="one-cover">
          <img src="/TopBar/Information.png" alt="info" 
            className={`cover-png ${visibleInformation ? '' : 'inactive-icon'}`} 
            />
        {visibleInformation &&
        <div className="icons-top-bar"></div>
        }
        <a href="#"  
        className={`link-topBar ${visibleInformation ? 'active1' : ''}`} 
        onClick={() => handleSidebarClick('information')}>
          Information
        </a>
        </div>
        
        <div className="one-cover">
        <img src="/TopBar/Dates.png" alt="dates" 
          className={`cover-png ${visibleDates ? '' : 'inactive-icon'}`} 
          />
        {visibleDates &&
        <div className="icons-top-bar"></div>
        }
        <a href="#" 
         className={`link-topBar ${visibleDates ? 'active1' : ''}`}
         onClick={() => handleSidebarClick('dates')}>
          Dates
        </a>
        </div>
        <div className="one-cover">
        <img src="/TopBar/cover.png" alt="" 
          className={`cover-png ${visibleEvents ? '' : 'inactive-icon'}`} 
          />
        {visibleEvents &&
        <div className="icons-top-bar"></div>
        }
        <a href="#" 
         className={`link-topBar ${visibleEvents ? 'active1' : ''}`}
         onClick={() => handleSidebarClick('events')}>
          Events
        </a>
        </div>
        <div className="one-cover">
        <img src="/TopBar/cover.png" alt="" 
        className={`cover-png ${visiblePages ? '' : 'inactive-icon'}`} 
       />
        {visiblePages && 
        <div className="icons-top-bar"></div>
        }
        <a href="#" 
         className={`link-topBar ${visiblePages ? 'active1' : ''}`}
         onClick={() => handleSidebarClick('pages')}>
          Pages
        </a>
        </div>
        <div className="one-cover">
        <img src="/TopBar/cover.png" alt="" 
        className={`cover-png ${visibleAddOns ? '' : 'inactive-icon'}`} 
        />
        {visibleAddOns && 
        <div className="icons-top-bar"></div>
        }
        <a href="#" 
         className={`link-topBar ${visibleAddOns ? 'active1' : ''}`}
         onClick={() => handleSidebarClick('addOns')}>
          Add Ons
        </a>
        </div>
        <div className="one-cover">
        <img src="/TopBar/cover.png" alt="" 
        className={`cover-png ${visibleReview ? '' : 'inactive-icon'}`}  
        />
        {visibleReview && 
        <div className="icons-top-bar"></div>
        }
        <a href="#" 
         className={`link-topBar ${visibleReview ? 'active1' : ''}`}
         onClick={() => handleSidebarClick('review')}>
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